import ErrorInput from "../ErrorInput/ErrorInput";

export default function CustomInput({
  tag = "input",
  label,
  type = "text",
  name,
  value,
  error,
  rows = 12,
  disabled = false,
  onChange,
  onBlur,
}) {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      {tag === "input" ? (
        <input
          key={type === "checkbox" ? `${name}-${value}` : undefined}
          id={name}
          name={name}
          type={type}
          {...(type === "checkbox"
            ? { checked: value }
            : type !== "file"
            ? { value }
            : {})}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        ></textarea>
      )}
      {error && <ErrorInput error={error} />}
    </div>
  );
}
