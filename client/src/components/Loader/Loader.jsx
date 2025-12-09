import styles from "./Loader.module.css";

export default function Loader({ text = "Зареждане" }) {
  return (
    <section id={styles.loader}>
      <p className={styles["loader-content"]}>
        {text}
        <span className={styles["loader-content-dot"]}>.</span>
        <span className={styles["loader-content-dot"]}>.</span>
        <span className={styles["loader-content-dot"]}>.</span>
      </p>
    </section>
  );
}
