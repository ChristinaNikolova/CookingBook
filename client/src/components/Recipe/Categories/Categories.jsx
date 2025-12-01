import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./Categories.module.css";

// todo extract css for the title
export default function Categories() {
  return (
    <section id="categories">
      <h2 className={styles["categories-title"]}>Категории</h2>
      <ul className={styles["categories-list"]}>
        <CategoryItem
          id="1"
          title="Торти"
          img="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
          desc=" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <CategoryItem
          id="1"
          title="Торти"
          img="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
          desc=" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <CategoryItem
          id="1"
          title="Торти"
          img="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
          desc=" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <CategoryItem
          id="1"
          title="Торти"
          img="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
          desc=" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </ul>
    </section>
  );
}
