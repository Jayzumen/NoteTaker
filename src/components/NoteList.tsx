import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import NoteCard, { SimplifiedNote } from "./NoteCard";
import { GiPencil } from "react-icons/gi";

type NoteListProps = {
  notes?: SimplifiedNote[];
};

function NoteList({ notes }: NoteListProps) {
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes?.filter((note) => {
      return (
        title === "" ||
        note.title?.toLowerCase().includes(title.toLowerCase())
      );
    });
  }, [title, notes]);

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1 className='mb-5 w-auto'>
            <GiPencil size={30} /> NoteTaker
          </h1>
        </Col>
        <Col xs='auto'>
          <Stack direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>Create Note</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} xl={4} className='gap-3'>
        {filteredNotes?.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default NoteList;
