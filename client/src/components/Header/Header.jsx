import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import styles from "./Header.module.css";

export default function Header({ isHome }) {
  const { isAuthenticated, isAdmin, user } = useAuthContext();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toogleSearch = () => {
    setShowSearch((state) => !state);
    setSearchQuery("");
  };

  const searchHandler = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/recipe/search?searched=${encodeURIComponent(searchQuery)}`);
      toogleSearch();
    }
  };

  const changeHandler = (e) => {
    setSearchQuery(e.target.value);
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
                <NavLink to="/recipe/favourites" className={isActiveLink}>
                  Любими
                </NavLink>
              </li>
              <li className="header-ul-li">
                <NavLink to="/notes" className={isActiveLink}>
                  Бележки
                </NavLink>
              </li>
              <li className="header-ul-li">
                <NavLink to="/auth/logout" className={isActiveLink}>
                  Изход,
                  <span className={styles["header-email"]}>{user.email}</span>
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
      {isAuthenticated && (
        <nav className={styles["header-nav"]}>
          <form className="header-nav-form" onSubmit={searchHandler}>
            <input
              className={`${styles["header-nav-form-input"]} ${
                showSearch && styles.show
              }`}
              type="text"
              value={searchQuery}
              onChange={changeHandler}
            />
            {showSearch && (
              <button className={getButtonColor()} type="submit">
                Търси
              </button>
            )}
          </form>
          {showSearch ? (
            <i
              onClick={toogleSearch}
              className={`fa-solid fa-xmark ${getButtonColor()}`}
              title="Затвори"
            ></i>
          ) : (
            <i
              onClick={toogleSearch}
              className={`fa-solid fa-magnifying-glass ${getButtonColor()}`}
              title="Търси рецепта"
            ></i>
          )}
        </nav>
      )}
    </header>
  );
}
