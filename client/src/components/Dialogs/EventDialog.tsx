import InputField from "@/components/Global/InputField";
import {
  useCreateEventMutation,
  useGetEventQuery,
  useUpdateEventMutation,
} from "@/features/events/eventsApiSlice";
import useToast from "@/hooks/useToast";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import * as Yup from "yup";
import UploadFileField from "@/components/Global/UploadFileField";

type Props = {
  create: boolean;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  refetch?: () => void;
  eventID?: string;
};

const EventDialog = ({
  create,
  visible,
  setVisible,
  refetch,
  eventID,
}: Props) => {
  const toast = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "events");
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          formik.setFieldValue("image", data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const {
    data: eventData,
    refetch: refetchEvent,
    isLoading,
  } = useGetEventQuery(eventID || "");

  const initialValues = {
    title: eventData?.data.title || "",
    date: eventData?.data.date.split("T")[0] || "",
    time: eventData?.data.time || "",
    location: eventData?.data.location || "",
    description: eventData?.data.description || "",
    image: eventData?.data.image || "",
  };

  const handleSubmit = async (values: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image?: string;
  }) => {
    try {
      const payload = {
        title: values.title,
        date: values.date,
        time: values.time,
        location: values.location,
        description: values.description,
        image: values.image,
      };

      const mutationParams = {
        id: eventID,
        payload: payload,
      };

      const response = create
        ? await createEvent(values).unwrap()
        : await updateEvent(mutationParams).unwrap();

      toast.toastSuccess(response.message);
      refetch && refetch();
      refetchEvent && refetchEvent();
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
          title: "",
          date: "",
          time: "",
          location: "",
          description: "",
          image: "",
        },
    validationSchema: Yup.object({
      title: Yup.string().required("שדה חובה"),
      date: Yup.string().required("שדה חובה"),
      time: Yup.string().required("שדה חובה"),
      location: Yup.string().required("שדה חובה"),
      description: Yup.string().required("שדה חובה"),
    }),
    onSubmit: (values: {
      title: string;
      date: string;
      time: string;
      location: string;
      description: string;
    }) => {
      handleSubmit(values);
    },
    enableReinitialize: true,
  });

  return (
    <Dialog
      className="w-full p-4 lg:w-1/3 lg:p-0"
      header={create ? "הוספת אירוע" : "עריכת אירוע"}
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
            {create ? "הוסף אירוע" : "עדכן אירוע"}
          </button>
        </div>
      }
    >
      {isLoading ? (
        <div>טוען...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <InputField
            id="date"
            name="date"
            type="date"
            label="תאריך"
            value={formik.values.date}
            onChange={formik.handleChange}
            errors={formik.errors.date}
            touched={formik.touched.date}
          />
          <InputField
            id="time"
            name="time"
            type="time"
            label="שעה"
            value={formik.values.time}
            onChange={formik.handleChange}
            errors={formik.errors.time}
            touched={formik.touched.time}
          />
          <InputField
            id="location"
            name="location"
            type="text"
            label="מיקום"
            value={formik.values.location}
            onChange={formik.handleChange}
            errors={formik.errors.location}
            touched={formik.touched.location}
          />
          <InputField
            id="description"
            name="description"
            type="text"
            label="תיאור"
            value={formik.values.description}
            onChange={formik.handleChange}
            errors={formik.errors.description}
            touched={formik.touched.description}
          />
          <UploadFileField
            id="image"
            name="image"
            type="file"
            label="תמונה"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>
      )}
    </Dialog>
  );
};

export default EventDialog;
