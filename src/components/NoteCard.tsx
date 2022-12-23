import { Link } from "react-router-dom";

export type SimplifiedNote = {
  title?: string;
  id?: string;
};

function NoteCard({ id, title }: SimplifiedNote) {
  return (
    <Link to={`/${id}`}>
      <div className='min-w-[190px] min-h-[125px] border border-gray-500 rounded-md text-center items-center p-8 hover:scale-[1.02] hover:shadow-md transition'>
        <div className='min-h-[50px] text-center'>
          <span
            className={
              title && title.length <= 24
                ? `capitalize font-semibold text-lg break-words`
                : `capitalize font-semibold text-lg truncate block`
            }
          >
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
