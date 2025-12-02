import ListWrapper from "../../ListWrapper/ListWrapper";
import ListItem from "../../ListItem/ListItem";
import styles from "./All.module.css";

// todo add title attributes!!!
export default function AllCategories() {
  return (
    <section id={styles["admin-all-categories"]}>
      <ListWrapper title="Категории">
        <ListItem name="Категория 1" />
        <ListItem name="Категория 2" />
        <ListItem name="Категория 3" />
        <ListItem name="Категория 4" />
        <ListItem name="Категория 5" />
      </ListWrapper>
    </section>
  );
}
