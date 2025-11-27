import styles from "./CustomInput.module.css";

export default function CustomInput({ label, type = "text" }) {
  return (
    <div className={styles["input-wrapper"]}>
      <label htmlFor="">{label}</label>
      <input type={type} />
    </div>
  );
}
