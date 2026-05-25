import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import Modal from "../components/Modal";
import Notes from "../components/Notes";
import ZeroNotesMessage from "../components/ZeroNotesMessage";
import Header from "../components/Header";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { notes, setUpdatingNote, setIsUpdating, onOpen } =
    useContext(AppContext);

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <div className="text-text space-y-8">
        <Header></Header>

        <div>
          {notes.length === 0 ? (
            <ZeroNotesMessage
              onOpen={onOpen}
              setIsUpdating={setIsUpdating}
            ></ZeroNotesMessage>
          ) : (
            ""
          )}
        </div>

        <button
          className="fixed bottom-10 right-10 bg-danger px-4 py-2 rounded-xl"
          onClick={handleLogout}
        >
          Logout
        </button>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
          {notes?.map((note) => (
            <Notes
              key={note.id}
              note={note}
              onOpen={onOpen}
              deleteNote={deleteNote}
              setIsUpdating={setIsUpdating}
              setUpdatingNote={setUpdatingNote}
            ></Notes>
          ))}
        </div>
      </div>
      <Modal></Modal>
    </>
  );
};

export default Dashboard;
