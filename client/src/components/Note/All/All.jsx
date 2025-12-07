// todo useMemo
// todo useCallback
// todo use Memo
// todo check useEffects dep array
// todo fix dep array config

import { useEffect, useReducer, useState } from "react";
import useConfigToken from "../../../hooks/useConfigToken";
import CreateNote from "../Create/Create";
import NoteItem from "../NoteItem/NoteItem";
import NoContent from "../../NoContent/NoContent";
import ServerError from "../../shared/ServerError/ServerError";
import { noteReducer } from "../../../utils/reducers/note";
import requester from "../../../utils/helpers/requester";
import { httpMethods } from "../../../utils/constants/global";
import styles from "./All.module.css";

export default function AllNotes() {
  const [notes, dispatch] = useReducer(noteReducer, []);
  const [serverError, setServerError] = useState("");
  const config = useConfigToken();

  useEffect(() => {
    requester("/notes", httpMethods.GET, null, config)
      .then((res) => {
        dispatch({
          type: "ALL",
          payload: res,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const createHandler = (note) => {
    dispatch({
      type: "ADD",
      payload: note,
    });
  };

  const deleteHandler = async (noteId) => {
    setServerError("");

    try {
      await requester(`/notes/${noteId}`, httpMethods.DELETE, null, config);
      dispatch({
        type: "DELETE",
        payload: noteId,
      });
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <section id="notes">
      <h2 className={styles["notes-title"]}>Моите бележки</h2>
      {serverError && <ServerError error={serverError} />}
      <CreateNote onCreate={createHandler} />
      {!notes.length && <NoContent title="бележки" />}
      <ul className={styles["notes-list"]}>
        {notes.map((x) => (
          <NoteItem
            key={x.id}
            id={x.id}
            description={x.description}
            onDelete={deleteHandler}
          />
        ))}
      </ul>
    </section>
  );
}
