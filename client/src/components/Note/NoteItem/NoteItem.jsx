import { memo } from "react";
import { getTranslations } from "../../../utils/i18n";
import styles from "./NoteItem.module.css";

function NoteItem({ id, description, isList, onDelete }) {
  const t = getTranslations();
  
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
        title={t.delete}
        onClick={() => onDelete(id)}
      ></i>
    </li>
  );
}

export default memo(NoteItem);
