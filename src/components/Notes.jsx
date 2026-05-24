const Notes = ({
  note,
  onOpen,
  deleteNote,
  setIsUpdating,
  setUpdatingNote,
}) => {
  return (
    <div>
      <p>{note.title}</p>
      <p>{note.content}</p>
      <p>{note.createdAt?.toDate().toLocaleString()}</p>
      <button
        className="border mb-10"
        onClick={() => {
          if (confirm("Delete this note?")) {
            deleteNote(note.id);
          }
        }}
      >
        Delete Note
      </button>
      <button
        className="border ml-5"
        onClick={() => {
          onOpen();
          setIsUpdating(true);
          setUpdatingNote(note);
        }}
      >
        Update Note
      </button>
    </div>
  );
};

export default Notes;
