import { FaEye, FaEyeSlash } from "react-icons/fa";

const ShowPassword = ({ showPass, setShowPass }) => {
  return (
    <>
      {showPass ? (
        <FaEyeSlash
          onClick={() => {
            setShowPass((prev) => !prev);
          }}
          className="absolute right-3 bottom-3"
        />
      ) : (
        <FaEye
          onClick={() => {
            setShowPass((prev) => !prev);
          }}
          className="absolute right-3 bottom-3"
        />
      )}
    </>
  );
};

export default ShowPassword;
