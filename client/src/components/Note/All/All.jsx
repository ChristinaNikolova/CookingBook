// todo useMemo
// todo useCallback
// todo use Memo

import CreateNote from "../Create/Create";
import NoteItem from "../NoteItem/NoteItem";
import styles from "./All.module.css";

export default function AllNotes() {
  return (
    <section id="notes">
      <h2 className={styles["notes-title"]}>Моите бележки</h2>
      <CreateNote />
      <ul className={styles["notes-list"]}>
        <NoteItem description="Бележка 1" />
        <NoteItem description="Бележка 2" />
        <NoteItem description="Бележка 3" />
        <NoteItem description="Бележка 4" />
      </ul>
    </section>
  );
}
