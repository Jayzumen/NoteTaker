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
    <form
      className='w-[80%] md:w-[60%] flex flex-col justify-center px-4 mb-10'
      onSubmit={handleSubmit}
    >
      <label className='font-semibold'>Title</label>
      <input
        className='outline-none p-2 rounded-md border-2 border-gray-500'
        type='text'
        required
        placeholder='Enter title...'
        ref={titleRef}
        defaultValue={title}
      />

      <label className='font-semibold mt-4'>Markdown</label>
      <textarea
        className='outline-none p-2 rounded-md border-2 border-gray-500'
        defaultValue={markdown}
        ref={markdownRef}
        placeholder='Write markdown...'
        required
        rows={15}
      />

      <div className='flex justify-end gap-4 mt-4'>
        <button
          type='submit'
          className='px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition'
        >
          Save
        </button>
        <Link to='..'>
          <button
            type='button'
            className='px-4 py-2 rounded-md border border-gray-500 bg-gray-300 hover:bg-gray-700 hover:text-white transition'
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}

export default NoteForm;
