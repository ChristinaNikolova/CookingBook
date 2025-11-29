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
      <label htmlFor={name}>{label}</label>
      {tag === "input" ? (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <textarea
          id={name}
          name={name}
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
