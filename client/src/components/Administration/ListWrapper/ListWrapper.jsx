import styles from "./ListWrapper.module.css";

export default function ListWrapper({ title, children }) {
  return (
    <>
      <h2 className={styles["list-wrapper-title"]}>{title}</h2>
      <ul className={styles["list-wrapper-ul"]}>{children}</ul>
    </>
  );
}
