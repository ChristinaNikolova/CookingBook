import ButtonLink from "../shared/ButtonLink/ButtonLink";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section id={styles["not-found"]} className="section">
      <h2 className={styles["not-found-title"]}>404</h2>
      <p className={styles["not-found-content"]}>
        Страницата, която търсите, не съществува!
      </p>
      <ButtonLink path="/" text="Начало" />
    </section>
  );
}
