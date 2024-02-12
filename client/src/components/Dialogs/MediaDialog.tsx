import InputField from "@/components/Global/InputField";
import UploadFileField from "@/components/Global/UploadFileField";
import DropDown from "@/components/Global/DropDown";
import {
  useCreateMediaMutation,
  useGetMediaQuery,
  useUpdateMediaMutation,
} from "@/features/media/mediaApiSlice";
import useToast from "@/hooks/useToast";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import * as Yup from "yup";

type Props = {
  create: boolean;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  refetch?: () => void;
  mediaID?: string;
};

const MediaDialog = ({
  create,
  visible,
  setVisible,
  refetch,
  mediaID,
}: Props) => {
  const toast = useToast();
  const [url, setUrl] = useState<File | null>(null);
  const [createMedia] = useCreateMediaMutation();
  const [updateMedia] = useUpdateMediaMutation();

  useEffect(() => {
    if (url) {
      const data = new FormData();
      data.append("file", url);
      data.append("upload_preset", "mediapreset");
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          formik.setFieldValue("url", data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const {
    data: mediaData,
    refetch: refetchMedia,
    isLoading,
  } = useGetMediaQuery(mediaID || "");

  const initialValues = {
    type: mediaData?.data.type || "",
    title: mediaData?.data.title || "",
    url: mediaData?.data.url || "",
  };

  const handleSubmit = async (values: {
    type: string;
    title: string;
    url: string;
  }) => {
    try {
      const payload = {
        type: values.type,
        title: values.title,
        url: values.url,
      };

      const mutationParams = {
        id: mediaID,
        payload,
      };

      const response = create
        ? await createMedia(values).unwrap()
        : await updateMedia(mutationParams).unwrap();

      toast.toastSuccess(response.message);
      refetch && refetch();
      refetchMedia && refetchMedia();
      formik.resetForm();
      setVisible(false);
    } catch (e: unknown) {
      console.log(e);
      toast.toastError("משהו השתבש, נסה שנית");
    }
  };

  const formik = useFormik({
    initialValues: !create
      ? initialValues
      : {
          type: "",
          title: "",
          url: "",
        },
    validationSchema: Yup.object({
      type: Yup.string()
        .matches(/(image|video)/, "סוג מדיה לא חוקי")
        .required("שדה חובה"),
      title: Yup.string().required("שדה חובה"),
      url: Yup.string().required("שדה חובה"),
    }),
    onSubmit: (values: { type: string; title: string; url: string }) => {
      handleSubmit(values);
    },
    enableReinitialize: true,
  });

  return (
    <Dialog
      className="w-full p-4 lg:w-1/3 lg:p-0"
      header={create ? "הוספת מדיה" : "עריכת מדיה"}
      visible={visible}
      onHide={() => {
        formik.resetForm();
        setVisible(false);
      }}
      footer={
        <div className="flex justify-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => formik.handleSubmit()}
          >
            {create ? "הוסף מדיה" : "עדכן מדיה"}
          </button>
        </div>
      }
    >
      {isLoading ? (
        <div>טוען...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DropDown
            id="type"
            name="type"
            label="סוג"
            showLabel={false}
            value={formik.values.type}
            options={[
              { value: "", label: "בחר סוג" },
              { value: "image", label: "תמונה" },
              { value: "video", label: "וידאו" },
            ]}
            onChange={formik.handleChange}
            errors={formik.errors.type}
            touched={formik.touched.type}
          />
          <InputField
            id="title"
            name="title"
            type="text"
            label="כותרת"
            value={formik.values.title}
            onChange={formik.handleChange}
            errors={formik.errors.title}
            touched={formik.touched.title}
          />
          <UploadFileField
            id="url"
            name="url"
            type="file"
            label="תמונה"
            onChange={(e) => {
              if (e.target.files) {
                setUrl(e.target.files[0]);
              }
            }}
          />
        </div>
      )}
    </Dialog>
  );
};

export default MediaDialog;
