import styles from "./Home.module.css";

export default function Home() {
  return (
    <section id={styles.home}>
      <h1 className={styles["home-title"]}>My CookingBook</h1>
      <button className={styles["home-btn"]} type="button">
        Добави рецепта
      </button>
    </section>
  );
}
