import { MdDelete } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useCRUD } from "../hooks/useCRUD";
import { motion } from "motion/react";
import AnimatedButton from "./AnimatedButton";

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

  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
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

const Notes = ({ note, onOpen, setIsUpdating, setUpdatingNote }) => {
  const navigate = useNavigate();

  const { confirmDelete } = useCRUD();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-surface rounded-xl p-5"
    >
      <motion.p variants={item} className="text-2xl mb-5  truncate">
        {note.title}
      </motion.p>
      <motion.p variants={item} className="mb-10  truncate">
        {note.content}
      </motion.p>

      <motion.div variants={item} className="flex justify-between items-center">
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
      </motion.div>
    </motion.div>
  );
};

export default Notes;
