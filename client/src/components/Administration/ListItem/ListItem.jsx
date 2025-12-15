import { memo } from "react";
import { Link } from "react-router-dom";
import { getTranslations } from "../../../utils/i18n";
import styles from "./ListItem.module.css";

function ListItem({ id, name, pending, isCategory = false, onDelete }) {
  const t = getTranslations();
  
  return (
    <li
      className={`${styles["list-item"]} ${
        pending ? styles["list-item-optimistic"] : ""
      }`}
    >
      <Link to={isCategory ? `/recipe/${name}/${id}` : `/recipe/${id}`}>
        {name}
      </Link>
      <div className={styles["list-item-icon-wrapper"]}>
        {isCategory && (
          <Link to={`/admin/category/edit/${id}`}>
            <i className="fa-solid fa-pen-to-square" title={t.edit}></i>
          </Link>
        )}
        <i
          className="fa-solid fa-trash"
          title={t.delete}
          onClick={() => onDelete(id)}
        ></i>
      </div>
    </li>
  );
}

export default memo(ListItem);
