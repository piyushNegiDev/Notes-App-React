import { ErrorMessage, Field, Formik, Form } from "formik";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const contactSchemValidation = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/test");
      console.log("successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-75">
      <Formik
        validationSchema={contactSchemValidation}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          //   console.log(values);
          handleLogin(values);
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
            type="submit"
            className="bg-orange self-end border px-3 py-1.5"
          >
            Login into an account
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
