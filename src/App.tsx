import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewNote from "./components/NewNote";
import NoteLayout from "./components/NoteLayout";
import NoteList from "./components/NoteList";
import Note from "./components/Note";
import EditNote from "./components/EditNote";
import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";

export type Note = {
  id?: string;
} & NoteData;

export type NoteData = {
  title?: string;
  markdown?: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const notesCollection = collection(db, "Notes");

  const notesToRender = useMemo(() => {
    return notes.map((note) => {
      return { ...note };
    });
  }, [notes]);

  async function createNote(noteData: NoteData) {
    await addDoc(notesCollection, { ...noteData });
    // console.log(`new note created at ${newNote.path}`);
  }

  async function updateNote(id?: string, docData?: any) {
    const getNote = doc(db, `Notes/${id}`);
    await setDoc(getNote, docData, { merge: true });
    // console.log("the note has been updated");
  }

  async function deleteNote(id?: string) {
    const document = doc(db, `Notes/${id}`);
    await deleteDoc(document);
    // console.log("Note was deleted");
  }

  useEffect(() => {
    onSnapshot(
      notesCollection,
      (snapshot: QuerySnapshot<DocumentData>) => {
        setNotes(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      }
    );
  }, []);

  // console.log(notes, "notes");
  return (
    <Container className='my-5'>
      <Routes>
        <Route
          path='/'
          element={<NoteList notes={notesToRender} />}
        />
        <Route
          path='/new'
          element={<NewNote onSubmit={createNote} />}
        />
        <Route
          path='/:id'
          element={<NoteLayout notes={notesToRender} />}>
          <Route index element={<Note onDelete={deleteNote} />} />
          <Route
            path='edit'
            element={<EditNote onSubmit={updateNote} />}
          />
        </Route>
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  );
}

export default App;
