import { useSigninMutation } from "@/features/auth/authApiSlice";
import { setAccessToken } from "@/features/auth/authSlice";
import Helpers from "@/helpers/app.helpers";
import { SignInPayload } from "@/types/auth";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputField from "@/components/Global/InputField";
import { ErrorResponse } from "@/types";
import useToast from "@/hooks/useToast";
import { useState } from "react";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [login] = useSigninMutation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: SignInPayload) => {
    try {
      setIsLoading(true);
      const response = await login(values).unwrap();
      const { data, message } = Helpers.handleAxiosSuccess(response);
      dispatch(setAccessToken(data));
      toast.toastSuccess(message);
      navigate(from, { replace: true });
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("כתובת אי-מייל לא נכונה").required("שדה חובה"),
      password: Yup.string()
        .required("שדה חובה")
        .min(8, "סיסמא חייבת להכיל לפחות 8 תווים")
        .max(32, "סיסמא חייבת להכיל לכל היותר 32 תווים")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          "סיסמא חייבת להכיל אותיות גדולות וקטנות, מספרים ותו מיוחד"
        ),
    }),
    onSubmit: (values: SignInPayload) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="flex flex-col p-8">
      <div className=" flex flex-col justify-center items-center">
        <div className="form p-4 min-h-[50vh] w-full max-w-md rounded-md border flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-8">התחברות</h1>
          <form onSubmit={formik.handleSubmit}>
            <InputField
              id="email"
              name="email"
              type="text"
              label="כתובת אי-מייל"
              value={formik.values.email}
              onChange={formik.handleChange}
              errors={formik.errors.email}
              touched={formik.touched.email}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              label="סיסמא"
              value={formik.values.password}
              onChange={formik.handleChange}
              errors={formik.errors.password}
              touched={formik.touched.password}
            />
            <div className="input-field mt-4">
              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-primary"
              >
                התחבר
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
