import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import styles from "./CategoryItem.module.css";

export default function CategoryItem({ id, image, name, description }) {
  return (
    <li className={styles["categories-item"]}>
      <img className={styles["categories-item-img"]} src={image} alt={name} />
      <h4 className={styles["categories-item-title"]}>{name}</h4>
      <p className={styles["categories-item-desc"]}>{description}</p>
      <ButtonLink path={`/recipe/${name}/${id}`} text="Рецепти" />
    </li>
  );
}
