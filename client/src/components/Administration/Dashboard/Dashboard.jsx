import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <section id={styles["admin-dashboard"]}>
      <p className={styles["admin-dashboard-content"]}>Здравей, Админ</p>
    </section>
  );
}
