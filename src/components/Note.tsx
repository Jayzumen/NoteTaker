import { Button, Row, Stack } from "react-bootstrap";
import { Col } from "react-bootstrap";
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
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1 className='text-capitalize'>{note?.title}</h1>
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to={`/${note?.id}/edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note?.id);
                navigate("/");
              }}
              variant='outline-danger'>
              Delete
            </Button>
            <Link to='/'>
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
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
          }}>
          {note?.markdown}
        </ReactMarkdown>
      )}
    </>
  );
}

export default Note;
