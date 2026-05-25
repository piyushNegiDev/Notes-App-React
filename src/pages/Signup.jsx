import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const noteDataValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Signup = () => {
  const navigate = useNavigate();
  const handleSignup = async ({ name, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await sendEmailVerification(userCredential.user);

      // Logout unverified user
      await signOut(auth);

      alert(
        "Account created successfully. Please verify your email before logging in.",
      );

      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already exists");
      }
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-220 mx-auto">
      <h1 className="bg-surface p-3 text-center rounded-2xl font-semibold text-2xl mb-10 text-primary">
        Get started on{" "}
        <span className="hover:text-primary-hover">SnapNotes</span>
      </h1>
      <div className="grid md:grid-cols-[1.2fr_0.7fr] items-center gap-10 bg-surface-secondary px-5 py-10 rounded-2xl">
        <div>
          <img className="rounded-xl" src="/notes-image.avif" alt="" />
        </div>
        <Formik
          validationSchema={noteDataValidation}
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            await handleSignup(values);
          }}
        >
          <Form className="flex flex-col gap-6 text-text">
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="name" className="text-lg">
                Name
              </label>
              <Field
                placeholder="User Name"
                name="name"
                className="h-10 rounded-lg border px-3"
              />
              <div className="text-xs text-red-500 absolute -bottom-4">
                <ErrorMessage name="name" />
              </div>
            </div>

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
              type="submit"
              className="text-text rounded-lg border px-3 py-1.5"
            >
              Create new account
            </button>

            <button
              type="button"
              onClick={navigateToLogin}
              className="text-text rounded-lg border px-3 py-1.5"
            >
              Log in
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
