import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NoteCard, { SimplifiedNote } from "./NoteCard";

type NoteListProps = {
  notes?: SimplifiedNote[];
};

function NoteList({ notes }: NoteListProps) {
  const [title, setTitle] = useState("");

  // filter function to filter through notes based on input
  const filteredNotes = useMemo(() => {
    return notes?.filter((note) => {
      return (
        title === "" || note.title?.toLowerCase().includes(title.toLowerCase())
      );
    });
  }, [title, notes]);

  const sortedNotes = useMemo(() => {
    return filteredNotes?.sort((a, b) => {
      if (a.title && b.title) {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
      }
      return 0;
    });
  }, [filteredNotes]);

  return (
    <div className='w-[80%] md:w-[60%]'>
      <div className='w-full pt-16 block md:flex md:justify-between '>
        <h1 className='mb-5 text-4xl font-semibold'>NoteTaker</h1>

        <Link to='/create'>
          <button className=' bg-blue-500 mt-2 rounded-md p-2 text-white hover:bg-blue-600 transition'>
            Create Note
          </button>
        </Link>
      </div>
      <form className='w-full md:mt-16 mt-8'>
        <label className='font-semibold'>Title</label>
        <input
          className='w-full p-2 text-black rounded-md border-2 border-slate-600 outline-none'
          placeholder='search for a note...'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>

      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto mt-8 gap-y-8 gap-x-6 mb-10'>
        {/* mapping through filtered Notes and only show matching notes */}
        {sortedNotes?.map((note) => (
          <div key={note.id}>
            <NoteCard id={note.id} title={note.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
