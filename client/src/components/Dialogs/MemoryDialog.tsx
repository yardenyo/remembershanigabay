import InputField from "@/components/Global/InputField";
import {
  useCreateMemoryMutation,
  useGetMemoryQuery,
  useUpdateMemoryMutation,
} from "@/features/memories/memoriesApiSlice";
import useToast from "@/hooks/useToast";
import { useFormik } from "formik";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import * as Yup from "yup";
import UploadFileField from "@/components/Global/UploadFileField";

type Props = {
  create: boolean;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  refetch?: () => void;
  memoryID?: string;
};

const MemoryDialog = ({
  create,
  visible,
  setVisible,
  refetch,
  memoryID,
}: Props) => {
  const toast = useToast();
  const [isLoadingFileUpload, setIsLoadingFileUpload] = useState(false);
  const [createMemory] = useCreateMemoryMutation();
  const [updateMemory] = useUpdateMemoryMutation();

  const {
    data: memoryData,
    refetch: refetchMemory,
    isLoading,
  } = useGetMemoryQuery(memoryID || "");

  const initialValues = {
    name: memoryData?.data?.name || "",
    title: memoryData?.data?.title || "",
    quote: memoryData?.data?.quote || "",
    image: memoryData?.data?.image || "",
  };

  const handleSubmit = async (values: {
    name: string;
    title: string;
    quote: string;
    image?: string;
  }) => {
    try {
      const payload = {
        name: values.name,
        title: values.title,
        quote: values.quote,
        image: values.image,
      };

      const mutationParams = {
        id: memoryID,
        payload,
      };

      const response = create
        ? await createMemory(values).unwrap()
        : await updateMemory(mutationParams).unwrap();

      toast.toastSuccess(response.message);
      refetch && refetch();
      refetchMemory && refetchMemory();
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
          name: "",
          title: "",
          quote: "",
          image: "",
        },
    validationSchema: Yup.object({
      name: Yup.string().required("שדה חובה"),
      title: Yup.string().required("שדה חובה"),
      quote: Yup.string().required("שדה חובה"),
      image: Yup.string(),
    }),
    onSubmit: (values: {
      name: string;
      title: string;
      quote: string;
      image: string;
    }) => {
      handleSubmit(values);
    },
    enableReinitialize: true,
  });

  const uploadFile = async (file: File) => {
    try {
      setIsLoadingFileUpload(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "memories");
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL_IMAGE, {
        method: "post",
        body: data,
      }).then((res) => res.json());
      formik.setFieldValue("image", response.url);
      setIsLoadingFileUpload(false);
    } catch (error) {
      console.error("Error during file upload:", error);
    } finally {
      setIsLoadingFileUpload(false);
    }
  };

  return (
    <Dialog
      className="w-full p-4 lg:w-1/3 lg:p-0"
      header={create ? "הוספת זכרון" : "עריכת זכרון"}
      visible={visible}
      onHide={() => setVisible(false)}
      footer={
        <div className="flex justify-end">
          <button
            className="btn btn-primary"
            disabled={isLoadingFileUpload}
            onClick={() => formik.handleSubmit()}
          >
            {create ? "הוסף זכרון" : "עדכן זכרון"}
          </button>
        </div>
      }
    >
      {isLoading ? (
        <div>טוען...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="name"
            name="name"
            type="text"
            label="שם"
            value={formik.values.name}
            onChange={formik.handleChange}
            errors={formik.errors.name}
            touched={formik.touched.name}
          />
          <InputField
            id="title"
            name="title"
            type="text"
            label="קרבה"
            value={formik.values.title}
            onChange={formik.handleChange}
            errors={formik.errors.title}
            touched={formik.touched.title}
          />
          <InputField
            id="quote"
            name="quote"
            type="textarea"
            label="ציטוט"
            value={formik.values.quote}
            onChange={formik.handleChange}
            errors={formik.errors.quote}
            touched={formik.touched.quote}
          />
          <UploadFileField
            id="image"
            name="image"
            type="file"
            label="תמונה"
            onChange={(e) => {
              if (e.target.files) {
                uploadFile(e.target.files[0]);
              }
            }}
            errors={formik.errors.image}
            touched={formik.touched.image}
          />
        </div>
      )}
    </Dialog>
  );
};

export default MemoryDialog;
