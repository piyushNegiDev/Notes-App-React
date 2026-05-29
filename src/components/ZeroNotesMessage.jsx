import AnimatedButton from "./AnimatedButton";

const ZeroNotesMessage = ({ onOpen, setIsUpdating }) => {
  return (
    <div className="flex flex-col rounded-xl justify-center items-center bg-surface-secondary h-50 w-100">
      <span className="text-3xl mb-3">No Notes Yet</span>
      <span className="text-xl mb-6">
        Create your first note to get started!
      </span>
      <AnimatedButton
        onClick={() => {
          setIsUpdating(false);
          onOpen();
        }}
        className={"text-white p-3 text-lg rounded-xl bg-primary"}
      >
        + Add your first note
      </AnimatedButton>
    </div>
  );
};

export default ZeroNotesMessage;
