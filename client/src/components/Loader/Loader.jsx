import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <section id={styles.loader}>
      <p className={styles["loader-content"]}>
        Зареждане
        <span className={styles["loader-content-dot"]}>.</span>
        <span className={styles["loader-content-dot"]}>.</span>
        <span className={styles["loader-content-dot"]}>.</span>
      </p>
    </section>
  );
}
