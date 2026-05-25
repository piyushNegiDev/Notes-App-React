import { ErrorMessage, Field, Formik, Form } from "formik";
import { auth } from "../../firebase";
import * as Yup from "yup";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const contactSchemValidation = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/");
  };

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);

      //   const userCredential =
      await signInWithEmailAndPassword(auth, email, password);

      // Refresh latest user data
      await auth.currentUser.reload();

      // Updated user
      const updatedUser = auth.currentUser;

      if (!updatedUser.emailVerified) {
        await signOut(auth);

        alert("Please verify your email first");
        alert(
          `Check spam/promotions folder if you don't receive the verification email.`,
        );

        return;
      }

      navigate("/dashboard", {
        state: {
          from: "loginPage",
        },
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-220 mx-auto">
      <h1 className="bg-surface p-3 text-center rounded-2xl font-semibold text-2xl mb-10 text-primary">
        Log into <span className="hover:text-primary-hover">SnapNotes</span>
      </h1>
      <div className="grid md:grid-cols-[1.2fr_0.7fr] items-center gap-10 bg-surface-secondary px-5 py-10 rounded-2xl">
        <div>
          <img className="rounded-xl" src="/notes-image.avif" alt="" />
        </div>
        <Formik
          validationSchema={contactSchemValidation}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            await handleLogin(values);
          }}
        >
          <Form className="flex flex-col gap-6 text-text">
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

            <div className="flex flex-col gap-1 relative mb-5">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <Field
                placeholder="********"
                type="password"
                name="password"
                className="h-10 rounded-lg border px-3"
              />
              <div className="text-xs text-red-500 absolute -bottom-4">
                <ErrorMessage name="password" />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="rounded-lg border px-3 py-1.5"
            >
              {loading ? "Loading..." : "Log in"}
            </button>

            <button
              type="button"
              onClick={navigateToSignUp}
              className="rounded-lg border px-3 py-1.5"
            >
              Create new account
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
