import { useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Modal from "../components/Modal";
import Notes from "../components/Notes";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [updatingNote, setUpdatingNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // const notesRef = collection(db, "notes");
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
      console.log(notesData);
    });

    return () => unsubscribe();
  }, [user.uid]);

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

  const location = useLocation();
  const fromPage = location.state?.from;

  return (
    <>
      <div>
        <p>
          {user ? (
            <span>Welcome {user?.displayName}</span>
          ) : (
            <span>Not Logged In</span>
          )}
        </p>

        <p>You came from: {fromPage || "Direct Link"}</p>

        <button onClick={handleLogout}>Logout</button>
        <button
          onClick={() => {
            setIsUpdating(false);
            onOpen();
          }}
          className="border ml-10"
        >
          Add Note
        </button>

        <div className="">
          {notes?.map((note) => (
            // <div key={note.id}>
            //   <p>{note.title}</p>
            //   <p>{note.content}</p>
            //   <p>{note.createdAt?.toDate().toLocaleString()}</p>
            //   <button
            //     className="border mb-10"
            //     onClick={() => {
            //       if (confirm("Delete this note?")) {
            //         deleteNote(note.id);
            //       }
            //     }}
            //   >
            //     Delete Note
            //   </button>
            //   <button
            //     className="border ml-5"
            //     onClick={() => {
            //       onOpen();
            //       setIsUpdating(true);
            //       setUpdatingNote(note);
            //     }}
            //   >
            //     Update Note
            //   </button>
            // </div>
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        user={user}
        isUpdating={isUpdating}
        updatingNote={updatingNote}
      ></Modal>
    </>
  );
};

export default Dashboard;
