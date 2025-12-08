import {
  startTransition,
  useCallback,
  useEffect,
  useOptimistic,
  useState,
} from "react";
import useConfigToken from "../../../../hooks/useConfigToken";
import ListWrapper from "../../ListWrapper/ListWrapper";
import ListItem from "../../ListItem/ListItem";
import NoContent from "../../../NoContent/NoContent";
import requester from "../../../../utils/helpers/requester";
import { categoryReducer } from "../../../../utils/reducers/category";
import { data } from "../../../../utils/helpers/data";
import { httpMethods } from "../../../../utils/constants/global";
import styles from "./All.module.css";

// todo add constants for the paths???
// todo fetch then oder await
// todo check useEffects dep array
// todo try catch / async await everywhere
// todo final test

// todo add pagination => fetch, async, dep array, constants
// todo useFetch

// todo edit recipe
// todo add everywhere server error
// todo delete cepices when category is deleted??

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [optimisticCategories, dispatchOptimisticCategories] = useOptimistic(
    categories,
    categoryReducer
  );
  const config = useConfigToken();

  useEffect(() => {
    requester("/admin/categories", httpMethods.GET, null, config)
      .then((res) => {
        const normalizedCategories = data.map(res, "pending", false);
        setCategories(normalizedCategories);
      })
      .catch((err) => console.error(err));
  }, [config]);

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
        await requester(
          `/admin/categories/${categoryId}`,
          httpMethods.DELETE,
          null,
          config
        );
        setCategories((state) => state.filter((x) => x.id !== categoryId));
      } catch (err) {
        console.error(err);
      }
    },
    [config, dispatchOptimisticCategories]
  );

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
