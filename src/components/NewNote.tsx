import React from "react";
import { Note, NoteData } from "../App";
import NoteForm from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
};

function NewNote({ onSubmit }: NewNoteProps) {
  return (
    <>
      <h1 className='my-4'>New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
}

export default NewNote;
