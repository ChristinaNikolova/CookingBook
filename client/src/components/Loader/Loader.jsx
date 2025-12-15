import { getTranslations } from "../../utils/i18n";
import styles from "./Loader.module.css";

export default function Loader({ text }) {
  const t = getTranslations();
  const displayText = text || t.loading;
  return (
    <section id={styles.loader}>
      <p className={styles["loader-content"]}>
        {displayText}
        <span className={styles["loader-content-dot"]}>.</span>
        <span className={styles["loader-content-dot"]}>.</span>
        <span className={styles["loader-content-dot"]}>.</span>
      </p>
    </section>
  );
}
