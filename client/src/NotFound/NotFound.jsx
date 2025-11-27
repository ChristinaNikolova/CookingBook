import Button from "../components/shared/Button/Button";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section id={styles["not-found"]}>
      <h2 className={styles["not-found-title"]}>404</h2>
      <p className={styles["not-found-content"]}>
        The page you are looking for doesn't exist!
      </p>
      <Button path="/" content="Начало" />
    </section>
  );
}
