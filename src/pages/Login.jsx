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

      console.log("successfully");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-100">
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
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Field
              placeholder="example@gmail.com"
              type="email"
              name="email"
              className="h-10 rounded border px-3"
            />
            <div className="text-xs text-red-500">
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <Field
              placeholder="********"
              type="password"
              name="password"
              className="h-10 rounded border px-3"
            />
            <div className="text-xs text-red-500">
              <ErrorMessage name="password" />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="border px-3 py-1.5"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <button
            type="button"
            onClick={navigateToSignUp}
            className="border px-3 py-1.5"
          >
            Create new account
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
