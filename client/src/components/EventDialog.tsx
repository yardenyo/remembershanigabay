import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import useToast from "@/hooks/useToast";
import * as Yup from "yup";
import InputField from "@/components/Global/InputField";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from "@/features/events/eventsApiSlice";

type Props = {
  create: boolean;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  refetch?: () => void;
};

const EventDialog = ({ create, visible, setVisible, refetch }: Props) => {
  const toast = useToast();
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  const handleSubmit = async (values: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
  }) => {
    try {
      const response = create
        ? await createEvent(values).unwrap()
        : await updateEvent(values).unwrap();
      toast.toastSuccess(response.message);
      refetch && refetch();
      setVisible(false);
    } catch (e: unknown) {
      toast.toastError("משהו השתבש, נסה שנית");
    }
  };

  const formik = useFormik({
    initialValues: {
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
      image: Yup.string().required("שדה חובה"),
    }),
    onSubmit: (values: {
      title: string;
      date: string;
      time: string;
      location: string;
      description: string;
      image: string;
    }) => {
      handleSubmit(values);
    },
  });

  return (
    <Dialog
      header={create ? "הוספת אירוע" : "עריכת אירוע"}
      visible={visible}
      onHide={() => setVisible(false)}
      footer={
        <div className="flex justify-end">
          <button
            className="btn btn-primary"
            onClick={() => formik.handleSubmit()}
          >
            {create ? "הוסף אירוע" : "עדכן אירוע"}
          </button>
        </div>
      }
    >
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
        <InputField
          id="image"
          name="image"
          type="text"
          label="תמונה"
          value={formik.values.image}
          onChange={formik.handleChange}
          errors={formik.errors.image}
          touched={formik.touched.image}
        />
      </div>
    </Dialog>
  );
};

export default EventDialog;
