import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import styles from "./RecipeItem.module.css";

export default function RecipeItem({ id, title, img }) {
  return (
    <li className={styles["recipes-item"]}>
      <img className={styles["recipes-item-img"]} src={img} alt={title} />
      <h4 className={styles["recipes-item-title"]}>{title}</h4>
      <ButtonLink path={`/recipe/${id}`} text="Прочети" />
    </li>
  );
}
