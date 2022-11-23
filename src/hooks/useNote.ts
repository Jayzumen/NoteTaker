import { useOutletContext } from "react-router-dom";
import { Note } from "../App";

export function useNote() {
  // returns context if provided for child route
  return useOutletContext<Note>();
}
