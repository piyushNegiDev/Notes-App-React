import { FaUserAlt } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import { MdModeNight } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { CiSearch } from "react-icons/ci";
import ThemeContext from "../context/ThemeContext";
import AnimatedButton from "./AnimatedButton";

const Header = () => {
  const { setNotes, user, onOpen, setIsUpdating } = useContext(AppContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const dateInputRef = useRef(null);

  useEffect(() => {
    if (!user?.uid) return;

    const notesRef = query(
      collection(db, "notes"),
      where("userId", "==", user.uid),
    );
    const unsubscribe = onSnapshot(
      notesRef,
      (snapshot) => {
        const notesList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        if (!inputValue && !dateValue) {
          setNotes(notesList);
          return notesList;
        }

        const filteredNotes = notesList.filter((note) => {
          const noteDate = note.updatedAt.toDate().toLocaleDateString();
          const selectedDate = new Date(dateValue).toLocaleDateString();

          if (inputValue && dateValue) {
            return (
              (note.title.toLowerCase().includes(inputValue.toLowerCase()) ||
                note.content
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())) &&
              noteDate === selectedDate
            );
          }
          if (inputValue && !dateValue) {
            return (
              note.title.toLowerCase().includes(inputValue.toLowerCase()) ||
              note.content.toLowerCase().includes(inputValue.toLowerCase())
            );
          }
          if (!inputValue && dateValue) {
            return noteDate === selectedDate;
          }

          return true;
        });

        setNotes(filteredNotes);

        return filteredNotes;
      },
      (error) => {
        console.error("Header notes listener failed:", error);
      },
    );

    return unsubscribe;
  }, [inputValue, dateValue, setNotes, user]);

  return (
    <div className="flex flex-col gap-5">
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

          <AnimatedButton
            className={
              "flex items-center gap-1 px-4 text-xl rounded-xl text-white bg-primary"
            }
            onClick={() => {
              setIsUpdating(false);
              onOpen();
            }}
          >
            + <span className="md:block hidden">Add Note</span>
          </AnimatedButton>

          <AnimatedButton
            className={"text-3xl sm:text-5xl border p-1 rounded-xl"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <WiDaySunny className="" />
            ) : (
              <MdModeNight className="" />
            )}
          </AnimatedButton>
        </div>
      </header>

      <div className="relative flex border rounded-xl pl-11 py-2 pr-1">
        <CiSearch className="absolute top-1.5 left-1 text-4xl" />

        <input
          type="text"
          className="flex-1 mr-2 focus:border-none focus:outline-none"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
        />

        <input
          ref={dateInputRef}
          type="date"
          className="w-26 p-1 focus:border-none focus:outline-none"
          onClick={() => {
            dateInputRef.current?.showPicker?.();
          }}
          onChange={(e) => {
            setDateValue(e.target.value);
          }}
          value={dateValue}
        />
      </div>
    </div>
  );
};

export default Header;
