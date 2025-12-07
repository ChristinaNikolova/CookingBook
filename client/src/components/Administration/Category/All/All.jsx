import { startTransition, useEffect, useOptimistic, useState } from "react";
import useConfigToken from "../../../../hooks/useConfigToken";
import ListWrapper from "../../ListWrapper/ListWrapper";
import ListItem from "../../ListItem/ListItem";
import NoContent from "../../../NoContent/NoContent";
import requester from "../../../../utils/helpers/requester";
import { categoryReducer } from "../../../../utils/reducers/category";
import { httpMethods } from "../../../../utils/constants/global";
import styles from "./All.module.css";

// todo add constants for the paths???
// todo fetch then oder await
// todo add pagination
// todo edit recipe
// todo edit category
// todo useFetch
// todo check if owner for reipe crud
// todo check useEffects dep array
// todo fix dep array config
// todo add everywhere server error

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
        const normalizedCategories = res.map((x) => ({ ...x, pending: false }));
        setCategories(normalizedCategories);
      })
      .catch((err) => console.error(err));
  }, []);

  // todo try catch
  const deleteHandler = async (categoryId) => {
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
  };

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
