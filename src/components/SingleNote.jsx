import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Header from "./Header";
import Modal from "./Modal";
import { MdDelete, MdUpdate } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { useCURD } from "../hooks/useCURD";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

const SingleNote = () => {
  const navigate = useNavigate();
  const { confirmDelete } = useCURD();
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
      toast.error("Please try again");
    }
  }, [id]);

  if (!note) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="text-text space-y-8">
        <Header></Header>
        <div className="bg-surface rounded-xl p-5">
          <h1 onClick={() => {}} className="text-4xl font-bold">
            {note.title}
          </h1>

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
        <div className="fixed bottom-10 right-5 sm:right-10 flex gap-5">
          <button className="text-xl">
            <IoMdArrowRoundBack
              onClick={() => {
                navigate("/dashboard");
              }}
            />
          </button>
          <button
            className="bg-danger px-4 py-2 rounded-xl"
            //   onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <Modal></Modal>
    </>
  );
};

export default SingleNote;
