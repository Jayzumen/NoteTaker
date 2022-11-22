import { FormEvent, useRef } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NoteData } from "../App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
} & Partial<NoteData>;

function NoteForm({
  onSubmit,
  title = "",
  markdown = "",
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
    });
    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                placeholder='Enter title...'
                ref={titleRef}
                defaultValue={title}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='markdown'>
          <Form.Label>Markdown</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            placeholder='Write markdown...'
            as='textarea'
            required
            rows={15}
          />
        </Form.Group>
        <Stack
          direction='horizontal'
          gap={2}
          className='justify-content-end '>
          <Button type='submit' variant='primary'>
            Save
          </Button>
          <Link to='..'>
            <Button type='button' variant='outline-secondary'>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NoteForm;
