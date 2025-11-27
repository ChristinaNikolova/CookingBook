import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id={styles.footer}>
      <p className={styles["footer-content"]}>
        CookingBook &copy; - {new Date().getFullYear()}
      </p>
    </footer>
  );
}
