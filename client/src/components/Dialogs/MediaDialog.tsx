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
import { Dialog } from "primereact/dialog";
import * as Yup from "yup";
import { useEffect, useState } from "react";

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
  const [isLoadingFileUpload, setIsLoadingFileUpload] = useState(false);
  const [createMedia] = useCreateMediaMutation();
  const [updateMedia] = useUpdateMediaMutation();

  const {
    data: mediaData,
    refetch: refetchMedia,
    isLoading,
  } = useGetMediaQuery(mediaID || "");

  const initialValues = {
    type: mediaData?.data?.type || "image",
    title: mediaData?.data?.title || "",
    url: mediaData?.data?.url || "",
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
    } catch (error) {
      console.error("Error during submission:", error);
      toast.toastError("משהו השתבש, נסה שנית");
    }
  };

  const formik = useFormik({
    initialValues: !create
      ? initialValues
      : {
          type: "image",
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

  const uploadFile = async (file: File) => {
    try {
      setIsLoadingFileUpload(true);
      const data = new FormData();
      data.append("file", file as Blob);
      data.append(
        "upload_preset",
        formik.values.type === "image"
          ? "mediapreset_images"
          : "mediapreset_videos"
      );
      data.append("resource_type", formik.values.type);
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      const response = await fetch(
        formik.values.type === "image"
          ? import.meta.env.VITE_CLOUDINARY_URL_IMAGE
          : import.meta.env.VITE_CLOUDINARY_URL_VIDEO,
        {
          method: "post",
          body: data,
        }
      ).then((res) => res.json());

      formik.setFieldValue("url", response?.url || "");
    } catch (error) {
      console.error("Error during file upload:", error);
    } finally {
      setIsLoadingFileUpload(false);
    }
  };

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
            disabled={isLoadingFileUpload}
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
            label="מדיה"
            onChange={async (e) => {
              if (e.target.files) {
                await uploadFile(e.target.files[0]);
              }
            }}
            errors={formik.errors.url}
            touched={formik.touched.url}
          />
        </div>
      )}
    </Dialog>
  );
};

export default MediaDialog;
