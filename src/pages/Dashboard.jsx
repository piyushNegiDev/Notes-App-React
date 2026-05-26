import { useContext } from "react";
import Modal from "../components/Modal";
import Notes from "../components/Notes";
import ZeroNotesMessage from "../components/ZeroNotesMessage";
import Header from "../components/Header";
import { AppContext } from "../context/AppContext";
import LogoutBtn from "../components/LogoutBtn";

const Dashboard = () => {
  const { notes, setUpdatingNote, setIsUpdating, onOpen } =
    useContext(AppContext);

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

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {notes?.map((note) => (
            <Notes
              key={note.id}
              note={note}
              onOpen={onOpen}
              setIsUpdating={setIsUpdating}
              setUpdatingNote={setUpdatingNote}
            ></Notes>
          ))}
        </div>

        <LogoutBtn className="fixed bottom-10 right-5 sm:right-10 bg-danger px-4 py-2 rounded-xl"></LogoutBtn>
      </div>
      <Modal></Modal>
    </>
  );
};

export default Dashboard;
