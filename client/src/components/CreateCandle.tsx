import InputField from "@/components/Global/InputField";
import { useCreateCandleMutation } from "@/features/candles/candlesApiSlice";
import useToast from "@/hooks/useToast";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  refetch: () => void;
};

const CreateCandle = ({ refetch }: Props) => {
  const toast = useToast();
  const [createCandle] = useCreateCandleMutation();

  const initialValues = {
    name: "",
    text: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("שדה חובה"),
    text: Yup.string().required("שדה חובה"),
  });

  const handleSubmit = async (values: { name: string; text: string }) => {
    try {
      const response = await createCandle(values).unwrap();
      refetch();
      toast.toastSuccess(response.message);
      formik.resetForm();
    } catch (e: unknown) {
      console.log(e);
      toast.toastError("משהו השתבש, נסה שנית");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex flex-col gap-4 p-8">
      <form
        className="flex flex-col gap-4 p-8 mx-auto bg-white rounded-lg shadow-lg w-full lg:w-1/2"
        onSubmit={formik.handleSubmit}
        noValidate
      >
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
          id="text"
          name="text"
          type="textarea"
          label="כל שעל הלב"
          value={formik.values.text}
          onChange={formik.handleChange}
          errors={formik.errors.text}
          touched={formik.touched.text}
        />
        <button type="submit" className="btn btn-primary w-full lg:w-1/2">
          הדלקת נר
        </button>
      </form>
    </div>
  );
};

export default CreateCandle;
