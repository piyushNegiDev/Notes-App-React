import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Header from "./Header";
import Modal from "./Modal";
import { MdDelete, MdUpdate } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { useCRUD } from "../hooks/useCRUD";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import LogoutBtn from "./LogoutBtn";
import { db } from "../config/firebase";
import AnimatedButton from "./AnimatedButton";
import { motion } from "motion/react";

const container = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },

  //   hover: {
  //     scale: 1.05,
  //     transition: {
  //       type: "spring",
  //       stiffness: 300,
  //       damping: 15,
  //     },
  //   },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

const SingleNote = () => {
  const navigate = useNavigate();
  const { confirmDelete } = useCRUD();
  const { id } = useParams();
  const { onOpen, user, setIsUpdating, setUpdatingNote } =
    useContext(AppContext);
  const [note, setNote] = useState(null);
  const [status, setStatus] = useState({ type: "loading", noteId: null });

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
          setStatus({ type: "not-found", noteId: id });
          return;
        }

        const noteDoc = snapshot.docs[0];

        setNote({
          id: noteDoc.id,
          ...noteDoc.data(),
        });

        setStatus({ type: "success", noteId: id });
      },
      (error) => {
        console.log(error);
        toast.error("Please try again");
        setStatus({ type: "error", noteId: id });
      },
    );

    return () => unsubscribe();
  }, [id, user]);

  useEffect(() => {
    if (status.type === "not-found" && status.noteId === id) {
      toast.error("Note not found or you do not have access");
      navigate("/dashboard");
    }
  }, [status, id, navigate]);

  const isCurrentRouteStatus = status.noteId === id;

  if (!isCurrentRouteStatus || status.type === "loading") {
    return null;
  }

  if (status.type === "error") {
    return <h1>Something went wrong.</h1>;
  }

  if (!note) {
    return null;
  }

  return (
    <>
      <div className="text-text space-y-8">
        <Header></Header>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="bg-surface rounded-xl p-5"
        >
          <motion.h1 variants={item} className="text-4xl font-bold">
            {note.title}
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-lg">
            {note.content}
          </motion.p>

          <motion.div
            variants={item}
            className="flex mt-15 justify-between items-center"
          >
            <p className="text-sm">
              {note.updatedAt?.toDate().toLocaleString()}
            </p>

            <div className="flex gap-5 text-2xl">
              <AnimatedButton
                onClick={() => {
                  confirmDelete(note.id);
                }}
              >
                <MdDelete />
              </AnimatedButton>
              <AnimatedButton
                onClick={() => {
                  onOpen();
                  setIsUpdating(true);
                  setUpdatingNote(note);
                }}
              >
                <MdUpdate />
              </AnimatedButton>
            </div>
          </motion.div>
        </motion.div>
        <div className="fixed bottom-10 right-5 sm:right-10 flex gap-5">
          <AnimatedButton className={"text-xl"}>
            <IoMdArrowRoundBack
              onClick={() => {
                navigate("/dashboard");
              }}
            />
          </AnimatedButton>

          <LogoutBtn className="bg-danger text-white px-4 py-2 rounded-xl"></LogoutBtn>
        </div>
      </div>
      <Modal></Modal>
    </>
  );
};

export default SingleNote;
