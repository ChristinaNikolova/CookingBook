import { memo } from "react";
import styles from "./NoteItem.module.css";

function NoteItem({ id, description, onDelete }) {
  return (
    <li className={styles["note-item"]}>
      <i className="fa-regular fa-note-sticky"></i>
      <span>{description}</span>
      <i
        className="fa-solid fa-xmark"
        title="Изтрий"
        onClick={() => onDelete(id)}
      ></i>
    </li>
  );
}

export default memo(NoteItem);
