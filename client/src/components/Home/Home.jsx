import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section id={styles.home}>
      <h1 className={styles["home-title"]}>My CookingBook</h1>
      <Link to="/recipe/create" className={styles["home-btn"]}>
        Добави рецепта
      </Link>
    </section>
  );
}
