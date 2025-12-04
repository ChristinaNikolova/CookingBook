import { useEffect, useState } from "react";
import useConfigToken from "../../../../hooks/useConfigToken";
import ListWrapper from "../../ListWrapper/ListWrapper";
import ListItem from "../../ListItem/ListItem";
import requester from "../../../../utils/requester";
import { httpMethods } from "../../../../utils/constants/global";
import styles from "./All.module.css";

// todo add title attributes!!!
// todo add constants for the paths???
// todo fetch then oder await
export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const config = useConfigToken();

  useEffect(() => {
    // load categories ????
    requester("/admin/categories", httpMethods.GET, null, config)
      .then((res) => setCategories(res))
      .catch((err) => console.error(err));
  }, []);

  // todo try catch
  const deleteHandler = async (id) => {
    try {
      await requester(
        `/admin/categories/${id}`,
        httpMethods.DELETE,
        null,
        config
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id={styles["admin-all-categories"]}>
      <ListWrapper title="Категории">
        {categories.map((x) => (
          <ListItem
            key={x.id}
            id={x.id}
            name={x.name}
            onDelete={deleteHandler}
          />
        ))}
      </ListWrapper>
    </section>
  );
}
