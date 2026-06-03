import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "./AnimatedButton";
import * as Yup from "yup";

const detailsSchemValidation = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async ({ email }) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);

      alert("Password reset link sent");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-220 mx-auto">
      <h1 className="bg-surface p-3 text-center rounded-2xl font-semibold text-2xl mb-10 text-primary">
        Forgot Password{" "}
      </h1>
      <div className="grid md:grid-cols-[1.2fr_0.7fr] items-center gap-10 bg-surface-secondary px-5 py-10 rounded-2xl">
        <div>
          <img className="rounded-xl" src="/notes-image.avif" alt="" />
        </div>
        <Formik
          validationSchema={detailsSchemValidation}
          initialValues={{
            email: "",
          }}
          onSubmit={async (values) => {
            await handleSubmit(values);
          }}
        >
          <Form className="flex flex-col gap-4 text-text">
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <Field
                placeholder="example@gmail.com"
                type="email"
                name="email"
                className="h-10 rounded-lg border px-3"
              />
              <div className="text-xs text-red-500 absolute -bottom-4">
                <ErrorMessage name="email" />
              </div>
            </div>

            <AnimatedButton
              disabled={loading}
              type={"submit"}
              className={"rounded-lg border px-3 py-1.5 mt-5"}
            >
              {loading ? "Loading..." : "Forgot Password"}
            </AnimatedButton>

            <AnimatedButton
              onClick={() => navigate("/login")}
              type={"button"}
              className={"rounded-lg border px-3 py-1.5"}
            >
              Log in
            </AnimatedButton>

            <AnimatedButton
              type={"button"}
              onClick={() => navigate("/")}
              className={"rounded-lg border px-3 py-1.5"}
            >
              Create new account
            </AnimatedButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
