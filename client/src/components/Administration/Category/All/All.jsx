import { Link } from "react-router-dom";
import styles from "./All.module.css";

// todo add component for the server errors!!!
// todo add title attributes!!!
export default function AllCategories() {
  return (
    <section id={styles["admin-all-categories"]}>
      <h2 className={styles["admin-all-categories-title"]}>Категории</h2>
      <ul className={styles["admin-all-categories-list"]}>
        <li className={styles["admin-all-categories-item"]}>
          <Link to={"/"}>Категория 1</Link>
          <div className={styles["admin-all-categories-item-icon-wrapper"]}>
            <i className="fa-solid fa-pen-to-square" title="Редактирай"></i>
            <i className="fa-solid fa-trash" title="Изтрий"></i>
          </div>
        </li>
        <li className={styles["admin-all-categories-item"]}>
          <Link to={"/"}>Категория 2</Link>
          <div className={styles["admin-all-categories-item-icon-wrapper"]}>
            <i className="fa-solid fa-pen-to-square" title="Редактирай"></i>
            <i className="fa-solid fa-trash" title="Изтрий"></i>
          </div>
        </li>
        <li className={styles["admin-all-categories-item"]}>
          <Link to={"/"}>Категория 3</Link>
          <div className={styles["admin-all-categories-item-icon-wrapper"]}>
            <i className="fa-solid fa-pen-to-square" title="Редактирай"></i>
            <i className="fa-solid fa-trash" title="Изтрий"></i>
          </div>
        </li>
        <li className={styles["admin-all-categories-item"]}>
          <Link to={"/"}>Категория 4</Link>
          <div className={styles["admin-all-categories-item-icon-wrapper"]}>
            <i className="fa-solid fa-pen-to-square" title="Редактирай"></i>
            <i className="fa-solid fa-trash" title="Изтрий"></i>
          </div>
        </li>
        <li className={styles["admin-all-categories-item"]}>
          <Link to={"/"}>Категория 5</Link>
          <div className={styles["admin-all-categories-item-icon-wrapper"]}>
            <i className="fa-solid fa-pen-to-square" title="Редактирай"></i>
            <i className="fa-solid fa-trash" title="Изтрий"></i>
          </div>
        </li>
      </ul>
    </section>
  );
}
