import styles from "./ListWrapper.module.css";

export default function ListWrapper({ children }) {
  return (
    <>
      <h2 className={styles["list-wrapper-title"]}>Категории</h2>
      <ul className={styles["list-wrapper-ul"]}>{children}</ul>
    </>
  );
}
