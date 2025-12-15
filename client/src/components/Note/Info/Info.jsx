import { memo } from "react";
import { getTranslations } from "../../../utils/i18n";
import styles from "./Info.module.css";

function Info() {
  const t = getTranslations();
  
  return (
    <p className={styles["info-content"]}>
      {t.beOrganized}
    </p>
  );
}

export default memo(Info);
