import styles from "./ErrorInput.module.css";

export default function ErrorInput({ error }) {
  return <div className={styles["error-input"]}>{error}</div>;
}
