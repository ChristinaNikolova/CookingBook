export default function Button({
  text,
  type = "button",
  disabled = true,
  onClick,
}) {
  const clickHanlder = () => {
    onClick();
  };

  return (
    <button
      onClick={clickHanlder}
      className="btn from-btn"
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
