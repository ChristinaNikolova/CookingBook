import { Outlet, useLocation } from "react-router-dom";
import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import styles from "./Jumbo.module.css";

export default function Jumbo() {
  const { pathname } = useLocation();

  const disabledButton = (path) => {
    return path === pathname;
  };

  return (
    <section id={styles["admin-jumbo"]} className="section">
      <h1 className={styles["admin-jumbo-title"]}>Администрация</h1>
      <ul className={styles["admin-jumbo-ul"]}>
        <li className={styles["admin-jumbo-li"]}>
          <ButtonLink
            path="/admin/category/all"
            text="Категории"
            disabled={disabledButton("/admin/category/all")}
          />
        </li>
        <li className={styles["admin-jumbo-li"]}>
          <ButtonLink
            path="/admin/category/create"
            text="Създай Категория"
            disabled={disabledButton("/admin/category/create")}
          />
        </li>
        <li className={styles["admin-jumbo-li"]}>
          <ButtonLink
            path="/admin/recipe/all"
            text="Рецепти"
            disabled={disabledButton("/admin/recipe/all")}
          />
        </li>
      </ul>
      <Outlet />
    </section>
  );
}
