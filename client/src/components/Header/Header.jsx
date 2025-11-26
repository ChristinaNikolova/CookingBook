import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);

  const isActiveLink = ({ isActive }) => {
    return isActive && styles["header-selected-link"];
  };

  const toogleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <header id={styles.header}>
      <nav className={styles["header-nav"]}>
        <ul className={styles["header-ul"]}>
          <li className={`header-ul-li ${styles["header-li-logo"]}`}>
            <Link to="/">CookingBook</Link>
          </li>
        </ul>
      </nav>
      <nav className={styles["header-nav"]}>
        <ul className={styles["header-ul"]}>
          <li className="header-ul-li">
            <NavLink to="/" className={isActiveLink}>
              Начало
            </NavLink>
          </li>
          <li className="header-ul-li">
            <NavLink to="/categories" className={isActiveLink}>
              Рецепти
            </NavLink>
          </li>
          <li className="header-ul-li">
            <NavLink to="/favourites" className={isActiveLink}>
              Любими
            </NavLink>
          </li>
          <li className="header-ul-li">
            <NavLink to="/menu" className={isActiveLink}>
              Меню
            </NavLink>
          </li>
          <li className="header-ul-li">
            <NavLink to="/shopping-list" className={isActiveLink}>
              Списъци
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className={styles["header-nav"]}>
        <form className="header-nav-form">
          <input
            className={styles["header-nav-form-input"]}
            style={{ display: showSearch ? "inline-block" : "none" }}
            type="text"
          />
          <button
            onClick={toogleSearch}
            className={styles["header-nav-form-btn"]}
            type="button"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </nav>
    </header>
  );
}
