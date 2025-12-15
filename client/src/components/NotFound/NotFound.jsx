import ButtonLink from "../shared/ButtonLink/ButtonLink";
import { getTranslations } from "../../utils/i18n";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const t = getTranslations();
  
  return (
    <section id={styles["not-found"]}>
      <h2 className={styles["not-found-title"]}>{t.notFoundTitle}</h2>
      <p className={styles["not-found-content"]}>
        {t.notFoundMessage}
      </p>
      <ButtonLink path="/" text={t.home} />
    </section>
  );
}
