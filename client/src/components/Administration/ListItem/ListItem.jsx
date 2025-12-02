import { Link } from "react-router-dom";
import styles from "./ListItem.module.css";

export default function ListItem({ name }) {
  return (
    <li className={styles["list-item"]}>
      <Link to={"/"}>{name}</Link>
      <div className={styles["list-item-icon-wrapper"]}>
        <i className="fa-solid fa-pen-to-square" title="Редактирай"></i>
        <i className="fa-solid fa-trash" title="Изтрий"></i>
      </div>
    </li>
  );
}
