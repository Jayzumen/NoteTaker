import { NoteData } from "../App";
import { useNote } from "../hooks/useNote";
import NoteForm from "./NoteForm";

type EditNoteProps = {
  onSubmit: (id?: string, data?: NoteData) => void;
};

function EditNote({ onSubmit }: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <h1 className='my-4'>Edit Note</h1>
      <NoteForm
        title={note?.title}
        markdown={note?.markdown}
        onSubmit={(data) => onSubmit(note?.id, data)}
      />
    </>
  );
}

export default EditNote;
