import { memo } from "react";
import styles from "./NoteItem.module.css";

// todo remove default category from category list
function NoteItem({ id, description, isList, onDelete }) {
  return (
    <li className={styles["note-item"]}>
      <i className="fa-regular fa-note-sticky"></i>
      {isList &&
        description.split("\n").map((x, i) => (
          <span className={styles["note-item-span-line"]} key={i}>
            {x}
          </span>
        ))}
      {!isList && <span>{description}</span>}
      <i
        className="fa-solid fa-xmark"
        title="Изтрий"
        onClick={() => onDelete(id)}
      ></i>
    </li>
  );
}

export default memo(NoteItem);
