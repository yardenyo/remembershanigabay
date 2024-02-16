import InputField from "@/components/Global/InputField";
import { useCreateCandleMutation } from "@/features/candles/candlesApiSlice";
import useToast from "@/hooks/useToast";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

type Props = {
  refetch: () => void;
};

const CreateCandle = ({ refetch }: Props) => {
  const toast = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
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
      const recaptchaValue = recaptchaRef.current?.getValue();
      if (!recaptchaValue) {
        throw new Error("אנא אשרו שאתם לא רובוט");
      }
      const response = await createCandle(values).unwrap();
      refetch();
      toast.toastSuccess(response.message);
      recaptchaRef.current?.reset();
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
        <div className="wrapper flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY as string}
          />
          <button type="submit" className="btn btn-primary">
            הדלקת נר
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCandle;
