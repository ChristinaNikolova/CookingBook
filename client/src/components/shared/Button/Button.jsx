export default function Button({
  text,
  type = "button",
  disabled = true,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="btn from-btn"
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
