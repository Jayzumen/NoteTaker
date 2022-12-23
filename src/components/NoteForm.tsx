import { FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NoteData } from "../App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
} & Partial<NoteData>;

function NoteForm({ onSubmit, title = "", markdown = "" }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  // stores input value in ref and stores value for title and markdown with onSubmit
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
    });
    navigate("..");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type='text'
        required
        placeholder='Enter title...'
        ref={titleRef}
        defaultValue={title}
      />

      <label>Markdown</label>
      <textarea
        defaultValue={markdown}
        ref={markdownRef}
        placeholder='Write markdown...'
        required
        rows={15}
      />

      <div className='justify-content-end '>
        <button type='submit'>Save</button>
        <Link to='..'>
          <button type='button'>Cancel</button>
        </Link>
      </div>
    </form>
  );
}

export default NoteForm;
