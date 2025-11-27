import Button from "../shared/Button/Button";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section id={styles.home}>
      <h1 className={styles["home-title"]}>My CookingBook</h1>
      <Button path="/recipe/create" content="Добави рецепта" />
    </section>
  );
}
