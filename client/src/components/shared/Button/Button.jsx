import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export default function Button({ path, content }) {
  return (
    <Link to={path} className={styles.btn}>
      {content}
    </Link>
  );
}
