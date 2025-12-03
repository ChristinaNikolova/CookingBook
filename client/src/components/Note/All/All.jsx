// todo useMemo
// todo useCallback
// todo use Memo

import CreateNote from "../Create/Create";
import styles from "./All.module.css";

export default function AllNotes() {
  return (
    <section id="notes">
      <h2 className={styles["notes-title"]}>Моите бележки</h2>
      <CreateNote />
      <ul className={styles["notes-list"]}>
        <li className={styles["notes-item"]}>
          <i className="fa-regular fa-note-sticky"></i>
          <span>Бележка 5</span>
          <i className="fa-solid fa-xmark" title="Изтрий"></i>
        </li>
        <li className={styles["notes-item"]}>
          <i className="fa-regular fa-note-sticky"></i>
          <span>Бележка 5</span>
          <i className="fa-solid fa-xmark" title="Изтрий"></i>
        </li>
        <li className={styles["notes-item"]}>
          <i className="fa-regular fa-note-sticky"></i>
          <span>Бележка 5</span>
          <i className="fa-solid fa-xmark" title="Изтрий"></i>
        </li>
        <li className={styles["notes-item"]}>
          <i className="fa-regular fa-note-sticky"></i>
          <span>Бележка 5</span>
          <i className="fa-solid fa-xmark" title="Изтрий"></i>
        </li>
        <li className={styles["notes-item"]}>
          <i className="fa-regular fa-note-sticky"></i>
          <span>Бележка 5</span>
          <i className="fa-solid fa-xmark" title="Изтрий"></i>
        </li>
      </ul>
    </section>
  );
}
