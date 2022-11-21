import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function NoteForm() {
  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control required placeholder='Enter title...' />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='markdown'>
          <Form.Label>Markdown</Form.Label>
          <Form.Control
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
