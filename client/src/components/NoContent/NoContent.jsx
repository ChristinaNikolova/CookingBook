import { getTranslations } from "../../utils/i18n";
import ButtonLink from "../shared/ButtonLink/ButtonLink";
import styles from "./NoContent.module.css";

export default function NoContent({ title, path }) {
  const t = getTranslations();
  
  return (
    <section id="no-content">
      <p
        className={styles["no-content-text"]}
      >{`${t.noContentYet} ${title}`}</p>
      {path && <ButtonLink path={path} text={t.create} />}
    </section>
  );
}
