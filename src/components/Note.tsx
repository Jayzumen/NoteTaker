import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../hooks/useNote";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

type NoteProps = {
  onDelete: (id?: string) => void;
};

function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <div className='my-10 p-5 bg-slate-700 shadow-slate-800 shadow-lg rounded w-[90%] lg:w-[60%] '>
      <div className='md:flex md:justify-between block mb-8'>
        <h1
          className={
            note.title && note.title.length <= 25
              ? "capitalize mb-5 text-3xl font-semibold lg:max-w-[500px]"
              : "capitalize mb-5 text-3xl font-semibold lg:max-w-[500px] truncate block"
          }
        >
          {note?.title}
        </h1>
        <div className='flex flex-end items-center gap-4'>
          <Link to={`/${note?.id}/edit`}>
            <button className='py-2 px-4 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600 transition'>
              Edit
            </button>
          </Link>
          <div>
            <button
              onClick={() => {
                onDelete(note?.id);
                navigate("/");
              }}
              className='py-2 px-4 rounded-md font-semibold bg-red-600 text-white hover:bg-red-700 transition'
            >
              Delete
            </button>
          </div>
          <Link to='/'>
            <button className='py-2 px-4 rounded-md font-semibold text-black  bg-slate-300 hover:bg-slate-900 hover:text-white transition'>
              Back
            </button>
          </Link>
        </div>
      </div>
      {/* need to check for Type string to render ReactMarkdown
       because it only accepts type string for children  */}
      {typeof note?.markdown === "string" && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                // @ts-ignore
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  PreTag='div'
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {note?.markdown}
        </ReactMarkdown>
      )}
    </div>
  );
}

export default Note;
