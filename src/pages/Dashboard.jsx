import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const notesRef = collection(db, "notes");

        // const notesSnapshot = await getDocs(notesRef);

        onSnapshot(notesRef, (snapshot) => {
          const notesData = snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((note) => {
              return note.userId === user.uid;
            });

          setNotes(notesData);
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    getNotes();
  }, [user.uid]);

  const addNote = async () => {
    try {
      const notesRef = collection(db, "notes");
      await addDoc(notesRef, {
        title: "test note 3",
        description: "test note 3 description",
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
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
      <button onClick={addNote} className="border ml-10">
        Add test note 3
      </button>

      <div className="">
        {notes?.map((note) => (
          <div key={note.id}>
            <p>{note.title}</p>
            <p>{note.description}</p>
            <p>{note.createdAt?.toDate().toLocaleString()}</p>
          </div>
        ))}
        {/* {console.log(notes[0]?.id)} */}
      </div>
    </div>
  );
};

export default Dashboard;
