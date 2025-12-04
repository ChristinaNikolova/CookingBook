import { Link } from "react-router-dom";
import styles from "./ListItem.module.css";

// todo use reducer

export default function ListItem({ id, name, onDelete }) {
  return (
    <li className={styles["list-item"]}>
      <Link to={`/recipe/${id}`}>{name}</Link>
      <div className={styles["list-item-icon-wrapper"]}>
        <i className="fa-solid fa-pen-to-square" title="Редактирай"></i>
        <i
          className="fa-solid fa-trash"
          title="Изтрий"
          onClick={() => onDelete(id)}
        ></i>
      </div>
    </li>
  );
}
