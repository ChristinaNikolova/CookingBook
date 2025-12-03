import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id={styles.footer}>
      <p className={styles["footer-content"]}>
        <Link to="/">CookingBook</Link> -
        <a
          href="https://github.com/ChristinaNikolova/CookingBook"
          target="_blank"
        >
          Christina Nikolova
        </a>
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
