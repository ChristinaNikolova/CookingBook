import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";
import useAuthContext from "../../hooks/useAuthContext";

export default function Header({ isHome }) {
  const { isAuthenticated, isAdmin } = useAuthContext();
  const [showSearch, setShowSearch] = useState(false);

  const toogleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const isActiveLink = ({ isActive }) => {
    return isActive ? styles["header-selected-link"] : "";
  };

  const getImageStyle = () => {
    return `${isHome ? styles["header-home"] : styles["header-main"]}`;
  };

  const getLinkColor = () => {
    return `${styles["header-ul"]} ${!isHome ? styles.white : ""}`;
  };

  const getButtonColor = () => {
    return `${styles["header-nav-form-btn"]} ${!isHome ? styles.white : ""}`;
  };

  return (
    <header id={styles.header} className={getImageStyle()}>
      <nav className={getLinkColor()}>
        <ul className={styles["header-ul"]}>
          <li className={`header-ul-li ${styles["header-li-logo"]}`}>
            <Link to="/">CookingBook</Link>
          </li>
        </ul>
      </nav>
      <nav className={styles["header-nav"]}>
        <ul className={getLinkColor()}>
          <li className="header-ul-li">
            <NavLink to="/" className={isActiveLink}>
              Начало
            </NavLink>
          </li>

          {isAdmin && (
            <li className="header-ul-li">
              <NavLink to="/admin" className={isActiveLink}>
                Администрация
              </NavLink>
            </li>
          )}

          {isAuthenticated ? (
            <>
              <li className="header-ul-li">
                <NavLink to="/recipe/categories" className={isActiveLink}>
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
                  Списъци
                </NavLink>
              </li>
              <li className="header-ul-li">
                <NavLink to="/auth/logout" className={isActiveLink}>
                  Изход
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="header-ul-li">
                <NavLink to="/auth/login" className={isActiveLink}>
                  Вход
                </NavLink>
              </li>
              <li className="header-ul-li">
                <NavLink to="/auth/register" className={isActiveLink}>
                  Регистрация
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      <nav className={styles["header-nav"]}>
        <form className="header-nav-form">
          <input
            className={`${styles["header-nav-form-input"]} ${
              showSearch && styles.show
            }`}
            type="text"
          />
          <button
            onClick={toogleSearch}
            className={getButtonColor()}
            type="button"
          >
            <i
              className="fa-solid fa-magnifying-glass"
              title="Търси рецепта"
            ></i>
          </button>
        </form>
      </nav>
    </header>
  );
}
