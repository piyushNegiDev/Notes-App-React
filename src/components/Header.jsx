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
        className="text-3xl sm:text-5xl font-semibold text-primary hover:text-primary-hover cursor-pointer"
      >
        SnapShot
      </h1>

      <div className="flex gap-2 sm:gap-5">
        <span className="bg-surface px-3 rounded-xl flex gap-3 items-center">
          <FaUserAlt className="" />
          <span className="hidden md:block text-md">{user.displayName}</span>
        </span>
        <button
          onClick={() => {
            setIsUpdating(false);
            onOpen();
          }}
          className="flex items-center gap-1 px-4 text-xl rounded-xl text-white bg-primary"
        >
          + <span className="md:block hidden">Add Note</span>
        </button>
        <button
          onClick={toggleTheme}
          className="text-3xl sm:text-5xl border p-1 rounded-xl"
        >
          {theme === "dark" ? (
            <WiDaySunny className="" />
          ) : (
            <MdModeNight className="" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
