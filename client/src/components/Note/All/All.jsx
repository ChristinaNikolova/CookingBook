import { useCallback, useEffect, useReducer } from "react";
import useFetch from "../../../hooks/useFetch";
import useAction from "../../../hooks/useAction";
import CreateNote from "../Create/Create";
import NoteItem from "../NoteItem/NoteItem";
import NoContent from "../../NoContent/NoContent";
import Info from "../Info/Info";
import Loader from "../../Loader/Loader";
import { noteReducer } from "../../../utils/reducers/note";
import { httpMethods, serverPaths } from "../../../utils/constants/global";
import styles from "./All.module.css";

export default function AllNotes() {
  const [notes, dispatch] = useReducer(noteReducer, []);

  const { execute } = useAction();
  const { values: result, loading } = useFetch([], serverPaths.NOTES);

  useEffect(() => {
    dispatch({
      type: "ALL",
      payload: result,
    });
  }, [result]);

  const createHandler = useCallback((note) => {
    dispatch({
      type: "ADD",
      payload: note,
    });
  }, []);

  const deleteHandler = useCallback(
    async (noteId) => {
      try {
        await execute(`${serverPaths.NOTES}/${noteId}`, httpMethods.DELETE);
        dispatch({
          type: "DELETE",
          payload: noteId,
        });
      } catch (err) {
        console.error(err.message);
      }
    },
    [execute]
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <section id="notes">
      <h2 className={styles["notes-title"]}>Моите бележки</h2>
      <Info />
      <CreateNote onCreate={createHandler} />
      {!notes.length && <NoContent title="бележки" />}
      <ul className={styles["notes-list"]}>
        {notes.map((x) => (
          <NoteItem
            key={x.id}
            id={x.id}
            description={x.description}
            isList={x.isList}
            onDelete={deleteHandler}
          />
        ))}
      </ul>
    </section>
  );
}
