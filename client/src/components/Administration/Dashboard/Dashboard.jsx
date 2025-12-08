import { memo } from "react";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <section id={styles["admin-dashboard"]}>
      <p className={styles["admin-dashboard-content"]}>Здравей, Админ</p>
    </section>
  );
}

export default memo(Dashboard);
