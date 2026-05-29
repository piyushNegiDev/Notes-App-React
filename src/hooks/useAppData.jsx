import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { db } from "../config/firebase";

export function useAppData() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [updatingNote, setUpdatingNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [notesLoading, setNotesLoading] = useState(true);

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
      setNotesLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return {
    user,
    notes,
    setNotes,
    notesLoading,
    isOpen,
    setIsOpen,
    updatingNote,
    setUpdatingNote,
    isUpdating,
    setIsUpdating,
    onOpen,
    onClose,
  };
}
