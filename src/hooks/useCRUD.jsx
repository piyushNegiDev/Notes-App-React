import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export const useCRUD = () => {
  const navigate = useNavigate();

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      navigate("/dashboard");
    } catch (error) {
      toast.error("Please try again");
      console.log(error);
    }
  };
  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p>Delete this note?</p>

          <div className="flex gap-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={async () => {
                await deleteNote(id);

                toast.success("Note deleted");

                closeToast();
              }}
            >
              Yes
            </button>

            <button className="border px-3 py-1 rounded" onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      },
    );
  };

  return { confirmDelete };
};
