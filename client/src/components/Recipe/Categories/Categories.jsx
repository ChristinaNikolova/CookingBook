import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import styles from "./Categories.module.css";

// todo extract css for the title
export default function Categories() {
  return (
    <section id="categories">
      <h2 className={styles["categories-title"]}>Категории</h2>
      <ul className={styles["categories-ul"]}>
        <li className={styles["categories-ul-item"]}>
          <img
            className={styles["categories-ul-item-img"]}
            src="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
            alt=""
          />
          <h4 className={styles["categories-ul-item-title"]}>Торти</h4>
          <p className={styles["categories-ul-item-content"]}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ButtonLink text="Рецепти" />
        </li>
        <li className={styles["categories-ul-item"]}>
          <img
            className={styles["categories-ul-item-img"]}
            src="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
            alt=""
          />
          <h4 className={styles["categories-ul-item-title"]}>Торти</h4>
          <p className={styles["categories-ul-item-content"]}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ButtonLink text="Рецепти" />
        </li>
        <li className={styles["categories-ul-item"]}>
          <img
            className={styles["categories-ul-item-img"]}
            src="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
            alt=""
          />
          <h4 className={styles["categories-ul-item-title"]}>Торти</h4>
          <p className={styles["categories-ul-item-content"]}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ButtonLink text="Рецепти" />
        </li>
        <li className={styles["categories-ul-item"]}>
          <img
            className={styles["categories-ul-item-img"]}
            src="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
            alt=""
          />
          <h4 className={styles["categories-ul-item-title"]}>Торти</h4>
          <p className={styles["categories-ul-item-content"]}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ButtonLink text="Рецепти" />
        </li>
        <li className={styles["categories-ul-item"]}>
          <img
            className={styles["categories-ul-item-img"]}
            src="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
            alt=""
          />
          <h4 className={styles["categories-ul-item-title"]}>Торти</h4>
          <p className={styles["categories-ul-item-content"]}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ButtonLink text="Рецепти" />
        </li>
        <li className={styles["categories-ul-item"]}>
          <img
            className={styles["categories-ul-item-img"]}
            src="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
            alt=""
          />
          <h4 className={styles["categories-ul-item-title"]}>Торти</h4>
          <p className={styles["categories-ul-item-content"]}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ButtonLink text="Рецепти" />
        </li>
      </ul>
    </section>
  );
}
