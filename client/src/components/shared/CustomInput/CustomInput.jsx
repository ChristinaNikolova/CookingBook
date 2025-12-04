import ErrorInput from "../ErrorInput/ErrorInput";

export default function CustomInput({
  tag = "input",
  label,
  type = "text",
  name,
  value,
  error,
  rows = 12,
  onChange,
  onBlur,
}) {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      {tag === "input" ? (
        <input
          id={name}
          name={name}
          type={type}
          {...(type !== "file" && { value })} // НЕ слагаме value ако е file
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        ></textarea>
      )}
      {error && <ErrorInput error={error} />}
    </div>
  );
}
