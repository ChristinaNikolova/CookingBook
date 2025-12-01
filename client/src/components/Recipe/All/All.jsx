import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import ListWrapper from "../ListWrapper/ListWrapper";
import styles from "./All.module.css";

export default function All() {
  return (
    <section id="recipes">
      <ListWrapper title="Име на категорията">
        <li className={styles["recipes-item"]}>
          <img
            className={styles["recipes-item-img"]}
            src="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
            alt=""
          />
          <h4 className={styles["recipes-item-title"]}>Заглавие</h4>
          <ButtonLink text="Прочети" />
        </li>
        <li className={styles["recipes-item"]}>
          <img
            className={styles["recipes-item-img"]}
            src="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
            alt=""
          />
          <h4 className={styles["recipes-item-title"]}>Заглавие</h4>
          <ButtonLink text="Прочети" />
        </li>
        <li className={styles["recipes-item"]}>
          <img
            className={styles["recipes-item-img"]}
            src="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
            alt=""
          />
          <h4 className={styles["recipes-item-title"]}>Заглавие</h4>
          <ButtonLink text="Прочети" />
        </li>
        <li className={styles["recipes-item"]}>
          <img
            className={styles["recipes-item-img"]}
            src="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
            alt=""
          />

          <h4 className={styles["recipes-item-title"]}>Заглавие</h4>
          <ButtonLink text="Прочети" />
        </li>
        <li className={styles["recipes-item"]}>
          <img
            className={styles["recipes-item-img"]}
            src="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
            alt=""
          />
          <h4 className={styles["recipes-item-title"]}>
            Заглавие Заглавие Заглавие ЗаглавиеЗаглавие
          </h4>
          <ButtonLink text="Прочети" />
        </li>
        <li className={styles["recipes-item"]}>
          <img
            className={styles["recipes-item-img"]}
            src="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
            alt=""
          />

          <h4 className={styles["recipes-item-title"]}>
            Заглавие ие Заглавие Заглавие ЗаглавиеЗаглавие
          </h4>
          <ButtonLink text="Прочети" />
        </li>
      </ListWrapper>
    </section>
  );
}
