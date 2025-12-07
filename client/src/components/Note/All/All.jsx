// todo useMemo
// todo useCallback
// todo use Memo
// todo check useEffects dep array

import { useEffect, useState } from "react";
import useConfigToken from "../../../hooks/useConfigToken";
import CreateNote from "../Create/Create";
import NoteItem from "../NoteItem/NoteItem";
import NoContent from "../../NoContent/NoContent";
import requester from "../../../utils/helpers/requester";
import { httpMethods } from "../../../utils/constants/global";
import styles from "./All.module.css";

export default function AllNotes() {
  const [notes, setNotes] = useState([]);
  const config = useConfigToken();

  useEffect(() => {
    requester("/notes", httpMethods.GET, null, config)
      .then((res) => setNotes(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="notes">
      <h2 className={styles["notes-title"]}>Моите бележки</h2>
      <CreateNote />
      {!notes.length && <NoContent title="бележки" />}
      <ul className={styles["notes-list"]}>
        {notes.map((x) => (
          <NoteItem key={x.id} id={x.id} description={x.description} />
        ))}
      </ul>
    </section>
  );
}
