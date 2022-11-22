import { Button, Row, Stack } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../hooks/useNote";

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
      {typeof note.markdown === "string" && (
        <ReactMarkdown children={note?.markdown} />
      )}
    </>
  );
}

export default Note;
