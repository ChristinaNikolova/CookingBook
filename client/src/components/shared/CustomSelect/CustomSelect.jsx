export default function CustomSelect({
  label,
  name,
  value,
  onChange,
  onBlur,
  values,
}) {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {values.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>
    </div>
  );
}
