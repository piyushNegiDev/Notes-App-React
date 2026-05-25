import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Header from "./Header";
import Modal from "./Modal";
import { MdDelete, MdUpdate } from "react-icons/md";
import { AppContext } from "../context/AppContext";

const SingleNote = () => {
  const { id } = useParams();
  const { onOpen, setIsUpdating, setUpdatingNote } = useContext(AppContext);
  const [note, setNote] = useState(null);

  useEffect(() => {
    try {
      const noteRef = doc(db, "notes", id);

      const unsubscribe = onSnapshot(noteRef, (snapshot) => {
        setNote({
          id: snapshot.id,
          ...snapshot.data(),
        });
      });

      return () => unsubscribe();
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  if (!note) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="text-text space-y-8">
        <Header></Header>
        <div>
          <h1 className="text-4xl font-bold">{note.title}</h1>

          <p className="mt-5 text-lg">{note.content}</p>

          <div className="flex mt-15 justify-between items-center">
            <p className="text-sm">
              {note.createdAt?.toDate().toLocaleString()}
            </p>

            <div className="flex gap-5 text-2xl">
              <button
                className=""
                onClick={() => {
                  confirmDelete(note.id);
                }}
              >
                <MdDelete />
              </button>
              <button
                className=""
                onClick={() => {
                  onOpen();
                  setIsUpdating(true);
                  setUpdatingNote(note);
                }}
              >
                <MdUpdate />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal></Modal>
    </>
  );
};

export default SingleNote;
