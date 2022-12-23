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
      <h1 className='mt-8 lg:mt-16 font-semibold text-2xl'>Edit Note</h1>
      <NoteForm
        title={note?.title}
        markdown={note?.markdown}
        onSubmit={(data) => onSubmit(note?.id, data)}
      />
    </>
  );
}

export default EditNote;
