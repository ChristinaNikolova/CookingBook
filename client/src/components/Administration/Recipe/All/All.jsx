import ListWrapper from "../../ListWrapper/ListWrapper";
import ListItem from "../../ListItem/ListItem";
import styles from "./All.module.css";

export default function AllRecipes() {
  return (
    <section id={styles["admin-all-categories"]}>
      <ListWrapper title="Рецепти">
        <ListItem name="Рецепта 1" />
        <ListItem name="Рецепта 2" />
        <ListItem name="Рецепта 3" />
        <ListItem name="Рецепта 4" />
        <ListItem name="Рецепта 5" />
      </ListWrapper>
    </section>
  );
}
