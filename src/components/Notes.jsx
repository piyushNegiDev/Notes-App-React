import { MdDelete } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useCRUD } from "../hooks/useCRUD";
import { motion } from "motion/react";
import AnimatedButton from "./AnimatedButton";

const Notes = ({ note, onOpen, setIsUpdating, setUpdatingNote }) => {
  const navigate = useNavigate();

  const { confirmDelete } = useCRUD();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: {
          delay: 0.6,
          duration: 0.3,
        },
        y: {
          delay: 0.6,
          duration: 0.3,
        },
      }}
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.1,
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      }}
      className="bg-surface rounded-xl p-5"
    >
      <p className="text-2xl mb-5  truncate">{note.title}</p>
      <p className="mb-10  truncate">{note.content}</p>

      <div className="flex justify-between items-center">
        <p className="text-xs">{note.createdAt?.toDate().toLocaleString()}</p>
        <div className="flex gap-1 text-2xl">
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

          <AnimatedButton
            className={"ml-1.5"}
            onClick={() => navigate(`/note/${note.id}`)}
          >
            <GrView />
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
};

export default Notes;
