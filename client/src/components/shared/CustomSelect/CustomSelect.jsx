export default function CustomSelect({ label, name, value, onChange, onBlur }) {
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
        <option value="preMeal">Предястие</option>
        <option value="meal">Основно</option>
        <option value="dessert">Десерт</option>
      </select>
    </div>
  );
}
