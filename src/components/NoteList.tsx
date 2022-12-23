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
    <>
      <div className='align-items-center mb-4'>
        <h1 className='mb-5 w-auto'>NoteTaker</h1>

        <Link to='/create'>
          <button className=''>Create Note</button>
        </Link>
      </div>
      <form>
        <label>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>

      <div className='gap-3 py-3'>
        {/* mapping through filtered Notes and only show matching notes */}
        {sortedNotes?.map((note) => (
          <div key={note.id}>
            <NoteCard id={note.id} title={note.title} />
          </div>
        ))}
      </div>
    </>
  );
}

export default NoteList;
