import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";

const LogoutBtn = ({ className }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
    toast.info("logged Out.");
  };

  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutBtn;
