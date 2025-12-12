import {
  startTransition,
  useCallback,
  useEffect,
  useOptimistic,
  useState,
} from "react";
import useFetch from "../../../../hooks/useFetch";
import useAction from "../../../../hooks/useAction";
import ListWrapper from "../../ListWrapper/ListWrapper";
import ListItem from "../../ListItem/ListItem";
import NoContent from "../../../NoContent/NoContent";
import Loader from "../../../Loader/Loader";
import { categoryReducer } from "../../../../utils/reducers/category";
import { data } from "../../../../utils/helpers/data";
import { httpMethods, serverPaths } from "../../../../utils/constants/global";
import styles from "./All.module.css";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [optimisticCategories, dispatchOptimisticCategories] = useOptimistic(
    categories,
    categoryReducer
  );

  const { execute } = useAction();
  const { values: result, loading } = useFetch(
    [],
    serverPaths.ADMIN_CATEGORIES
  );

  useEffect(() => {
    if (result.length) {
      const normalizedCategories = data.map(result, "pending", false);
      setCategories(normalizedCategories);
    }
  }, [result]);

  const deleteHandler = useCallback(
    async (categoryId) => {
      setCategories((state) =>
        state.map((x) => (x.id === categoryId ? { ...x, pending: true } : x))
      );

      startTransition(() => {
        dispatchOptimisticCategories({
          type: "DELETE",
          payload: categoryId,
        });
      });

      try {
        await execute(
          `${serverPaths.ADMIN_CATEGORIES}/${categoryId}`,
          httpMethods.DELETE
        );
        setCategories((state) => state.filter((x) => x.id !== categoryId));
      } catch (err) {
        console.error(err.message);
      }
    },
    [dispatchOptimisticCategories, execute]
  );

  if (loading) {
    return <Loader />;
  }

  if (!categories.length) {
    return <NoContent title="категории" path="/admin/category/create" />;
  }

  return (
    <section id={styles["admin-all-categories"]}>
      <ListWrapper title="Категории">
        {optimisticCategories.map((x) => (
          <ListItem
            key={x.id}
            id={x.id}
            name={x.name}
            pending={x.pending}
            isCategory
            onDelete={deleteHandler}
          />
        ))}
      </ListWrapper>
    </section>
  );
}
