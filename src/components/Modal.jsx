import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { db } from "../../firebase";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const Modal = () => {
  const { isOpen, onClose, user, isUpdating, updatingNote } =
    useContext(AppContext);

  const noteDataValidation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const addNote = async (note) => {
    try {
      const notesRef = collection(db, "notes");
      await addDoc(notesRef, {
        title: note.title,
        content: note.content,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      onClose();
      toast.success("Note Added Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateNote = async (note) => {
    try {
      await updateDoc(doc(db, "notes", updatingNote.id), {
        title: note.title,
        content: note.content,
        updatedAt: serverTimestamp(),
      });
      onClose();
      toast.success("Note Updated Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return createPortal(
    <>
      {isOpen && (
        <div className="text-text fixed inset-0 backdrop-blur-sm flex items-center">
          <Formik
            validationSchema={noteDataValidation}
            initialValues={
              isUpdating
                ? {
                    title: updatingNote.title,
                    content: updatingNote.content,
                  }
                : {
                    title: "",
                    content: "",
                  }
            }
            onSubmit={(values) => {
              isUpdating ? updateNote(values) : addNote(values);
            }}
          >
            <Form className="max-w-150 bg-surface-secondary flex flex-col gap-6 mx-auto flex-1 p-5 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="text-2xl">
                  {isUpdating ? "Update Note" : "Add Note"}
                </p>
                <RxCross2
                  onClick={() => {
                    onClose();
                  }}
                  className="text-text text-2xl"
                />
              </div>
              <div className="flex flex-col relative gap-1">
                <label htmlFor="title">Title</label>
                <Field
                  placeholder="Enter note title..."
                  type="text"
                  name="title"
                  className="border pl-4 py-2"
                />
                <div className="text-red-500 text-xs absolute -bottom-4">
                  <ErrorMessage name="title" />
                </div>
              </div>

              <div className="flex flex-col relative gap-1">
                <label htmlFor="content">Content</label>
                <Field
                  placeholder="Write your note here..."
                  as="textarea"
                  name="content"
                  className="border pl-4 py-2"
                />
                <div className="text-red-500 text-xs absolute -bottom-4">
                  <ErrorMessage name="content" />
                </div>
              </div>

              <button type="submit" className="self-end border px-4 py-2">
                Save Note
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </>,
    document.getElementById("modal"),
  );
};

export default Modal;
