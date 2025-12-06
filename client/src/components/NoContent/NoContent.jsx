import ButtonLink from "../shared/ButtonLink/ButtonLink";
import styles from "./NoContent.module.css";

export default function NoContent({ title, path }) {
  return (
    <section id="no-content">
      <p
        className={styles["no-content-text"]}
      >{`Все още няма добавени ${title}`}</p>
      <ButtonLink path={path} text="Създай" />
    </section>
  );
}
