import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../context/useAuth";

export function useAppData() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [updatingNote, setUpdatingNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!user) return;

    const notesRef = query(
      collection(db, "notes"),
      where("userId", "==", user.uid),
      orderBy("updatedAt", "desc"),
    );

    const unsubscribe = onSnapshot(notesRef, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotes(notesData);
    });

    return () => unsubscribe();
  }, [user]);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return {
    user,
    notes,
    setNotes,
    isOpen,
    setIsOpen,
    updatingNote,
    setUpdatingNote,
    isUpdating,
    setIsUpdating,
    onOpen,
    onClose,
    theme,
    toggleTheme,
  };
}
