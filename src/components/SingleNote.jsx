import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import Header from "./Header";
import Modal from "./Modal";
import { MdDelete, MdUpdate } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { useCRUD } from "../hooks/useCRUD";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import LogoutBtn from "./LogoutBtn";

const SingleNote = () => {
  const navigate = useNavigate();
  const { confirmDelete } = useCRUD();
  const { id } = useParams();
  const { onOpen, user, setIsUpdating, setUpdatingNote } =
    useContext(AppContext);
  const [note, setNote] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!user || !id) return;

    const noteQuery = query(
      collection(db, "notes"),
      where(documentId(), "==", id),
      where("userId", "==", user.uid),
    );

    const unsubscribe = onSnapshot(
      noteQuery,
      (snapshot) => {
        if (snapshot.empty) {
          setNote(null);
          setStatus("not-found");
          return;
        }

        const noteDoc = snapshot.docs[0];

        setNote({
          id: noteDoc.id,
          ...noteDoc.data(),
        });

        setStatus("success");
      },
      (error) => {
        console.log(error);
        toast.error("Please try again");
        setStatus("error");
      },
    );

    return () => unsubscribe();
  }, [id, user]);

  useEffect(() => {
    if (status === "not-found") {
      toast.error("Note not found or you do not have access");
      navigate("/dashboard");
    }
  }, [status, navigate]);

  if (status === "loading" || note?.id !== id) {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>Something went wrong.</h1>;
  }

  if (!note) {
    return null;
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

          <LogoutBtn className="bg-danger px-4 py-2 rounded-xl"></LogoutBtn>
        </div>
      </div>
      <Modal></Modal>
    </>
  );
};

export default SingleNote;
