import { memo } from "react";
import { getTranslations } from "../../../utils/i18n";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const t = getTranslations();
  
  return (
    <section id={styles["admin-dashboard"]}>
      <p className={styles["admin-dashboard-content"]}>{t.helloAdmin}</p>
    </section>
  );
}

export default memo(Dashboard);
