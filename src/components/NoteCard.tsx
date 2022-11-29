import React from "react";
import { Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/NoteList.module.css";

export type SimplifiedNote = {
  title?: string;
  id?: string;
};

function NoteCard({ id, title }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`text-reset text-decoration-none  ${styles.card}`}>
      <Card.Body>
        <Stack
          gap={2}
          className='align-items-center justify-content-center h-100'>
          <span className='fs-5 py-4 fw-bolder text-capitalize'>
            {title}
          </span>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;
