import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const contactSchemValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Signup = () => {
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
      console.log(userCredential.user);
      alert("Account Created");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-75">
      <Formik
        validationSchema={contactSchemValidation}
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          //   console.log(values);
          handleSignup(values);
        }}
      >
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Field
              placeholder="User Name"
              name="name"
              className="h-10 rounded border px-3"
            />
            <div className="text-xs text-red-500">
              <ErrorMessage name="name" />
            </div>
          </div>

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
            type="submit"
            className="bg-orange self-end border px-3 py-1.5"
          >
            Create an account
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
