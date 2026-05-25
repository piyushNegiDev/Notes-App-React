import { FaUserAlt } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import { MdModeNight } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, onOpen, setIsUpdating, theme, toggleTheme } =
    useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center">
      <h1
        onClick={() => {
          navigate("/dashboard");
        }}
        className="text-5xl font-semibold text-primary hover:text-primary-hover cursor-pointer"
      >
        SnapShot
      </h1>
      <div className="flex gap-5">
        <span className="bg-surface px-3 py-2 rounded-xl flex gap-3 items-center">
          <FaUserAlt className="" />
          <span className="text-md">{user.displayName}</span>
        </span>
        <button
          onClick={() => {
            setIsUpdating(false);
            onOpen();
          }}
          className="px-4 text-xl rounded-xl text-white p-3 bg-primary"
        >
          + Add Note
        </button>
        <button onClick={toggleTheme} className="border p-1 rounded-xl">
          {theme === "dark" ? (
            <WiDaySunny className="text-5xl" />
          ) : (
            <MdModeNight className="text-5xl" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
