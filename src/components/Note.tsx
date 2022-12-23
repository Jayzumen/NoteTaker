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
    <div className='my-5 p-3 bg-light shadow-lg rounded'>
      <div className='align-items-center mb-4'>
        <div>
          <h1 className='text-capitalize'>{note?.title}</h1>
        </div>
        <div className=''>
          <div className=''>
            <Link to={`/${note?.id}/edit`}>
              <button className=''>Edit</button>
            </Link>
            <button
              onClick={() => {
                onDelete(note?.id);
                navigate("/");
              }}
              className=''
            >
              Delete
            </button>
            <Link to='/'>
              <button className=''>Back</button>
            </Link>
          </div>
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
