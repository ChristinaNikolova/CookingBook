import { getTranslations } from "../../../utils/i18n";
import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import styles from "./RecipeItem.module.css";

export default function RecipeItem({ id, title, image }) {
  const t = getTranslations();
  
  return (
    <li className={styles["recipes-item"]}>
      <img className={styles["recipes-item-img"]} src={image} alt={title} />
      <h4 className={styles["recipes-item-title"]}>{title}</h4>
      <ButtonLink path={`/recipe/${id}`} text={t.read} />
    </li>
  );
}
