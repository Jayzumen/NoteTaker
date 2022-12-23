import { Link } from "react-router-dom";

export type SimplifiedNote = {
  title?: string;
  id?: string;
};

function NoteCard({ id, title }: SimplifiedNote) {
  return (
    <Link to={`/${id}`} className='text-reset text-decoration-none'>
      <div className='p-0'>
        <div className='align-items-center justify-content-center gap-2'>
          <span className='fs-5 py-5 fw-bolder text-capitalize'>{title}</span>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
