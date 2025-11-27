import styles from "./CustomInput.module.css";

export default function CustomInput({
  tag = "input",
  label,
  type = "text",
  name,
  value,
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
    </div>
  );
}
