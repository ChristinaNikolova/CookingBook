import styles from "./ServerError.module.css";

export default function ServerError({ error }) {
  return (
    <section id={styles["server-error"]}>
      <p className="error">{error}</p>
    </section>
  );
}
