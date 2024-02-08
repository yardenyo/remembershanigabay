import InputField from "@/components/Global/InputField";
import useToast from "@/hooks/useToast";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const Contact = () => {
  const toast = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("שדה חובה"),
    email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
    subject: Yup.string().required("שדה חובה"),
    message: Yup.string().required("שדה חובה"),
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      const recaptchaValue = recaptchaRef.current?.getValue();
      if (!recaptchaValue) {
        throw new Error("אנא אשרו שאתם לא רובוט");
      }
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        reply_to: values.email,
        subject: values.subject,
        message: values.message,
      };
      await emailjs.send(
        import.meta.env.VITE_EMAIL_JS_SERVICE_ID as string,
        import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID as string,
        templateParams,
        import.meta.env.VITE_EMAIL_JS_USER_ID as string
      );
      recaptchaRef.current?.reset();
      formik.resetForm();
      toast.toastSuccess("ההודעה נשלחה בהצלחה");
    } catch (error) {
      toast.toastError("שליחת ההודעה נכשלה");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto" id="contact">
        <div className="title text-center text-3xl font-semibold">צרו קשר</div>
        <div className="title-underline" />
        <div className="p-8 flex gap-4 flex-col lg:flex-row">
          <div className="w-full p-8 flex flex-col gap-4">
            <div className="wrapper">
              <div className="text-2xl font-semibold text-red-500 text-center lg:text-right">
                צרו איתנו קשר
              </div>
              <div className="text-lg text-center lg:text-right">
                <div>תרגישו חופשי ליצור איתנו קשר בכל זמן. בכל נושא !</div>
              </div>
            </div>
            <form
              className="flex flex-col gap-4"
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
                id="email"
                name="email"
                type="email"
                label="אימייל"
                value={formik.values.email}
                onChange={formik.handleChange}
                errors={formik.errors.email}
                touched={formik.touched.email}
              />
              <InputField
                id="subject"
                name="subject"
                type="text"
                label="נושא"
                value={formik.values.subject}
                onChange={formik.handleChange}
                errors={formik.errors.subject}
                touched={formik.touched.subject}
              />
              <InputField
                id="message"
                name="message"
                type="textarea"
                label="הודעה"
                value={formik.values.message}
                onChange={formik.handleChange}
                errors={formik.errors.message}
                touched={formik.touched.message}
              />
              <div className="wrapper flex items-center justify-between">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={
                    import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY as string
                  }
                />
                <button type="submit" className="btn btn-primary">
                  שלח
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
