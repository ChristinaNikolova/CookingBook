import ErrorInput from "../ErrorInput/ErrorInput";
import styles from "./CustomInput.module.css";

export default function CustomInput({
  tag = "input",
  label,
  type = "text",
  name,
  value,
  error,
  onChange,
  onBlur,
}) {
  return (
    <div className={styles["input-wrapper"]}>
      <label htmlFor="">{label}</label>
      {tag === "input" ? (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <textarea
          name={name}
          id=""
          rows={12}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        ></textarea>
      )}
      {error && <ErrorInput error={error} />}
    </div>
  );
}
