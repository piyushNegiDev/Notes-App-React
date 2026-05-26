import { MdDelete } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useCRUD } from "../hooks/useCRUD";

const Notes = ({ note, onOpen, setIsUpdating, setUpdatingNote }) => {
  const navigate = useNavigate();

  const { confirmDelete } = useCRUD();

  return (
    <div className="bg-surface rounded-xl p-5">
      <p className="text-2xl mb-5  truncate">{note.title}</p>
      <p className="mb-10  truncate">{note.content}</p>

      <div className="flex justify-between items-center">
        <p className="text-xs">{note.createdAt?.toDate().toLocaleString()}</p>
        <div className="flex gap-1 text-2xl">
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
          <button
            className="ml-1.5"
            onClick={() => navigate(`/note/${note.id}`)}
          >
            <GrView />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
