import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import styles from "./CategoryItem.module.css";

export default function CategoryItem({ id, img, title, desc }) {
  return (
    <li className={styles["categories-item"]}>
      <img className={styles["categories-item-img"]} src={img} alt={title} />
      <h4 className={styles["categories-item-title"]}>{title}</h4>
      <p className={styles["categories-item-desc"]}>{desc}</p>
      <ButtonLink path={`/recipe/${id}`} text="Рецепти" />
    </li>
  );
}
