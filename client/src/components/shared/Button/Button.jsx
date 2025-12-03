import { useFormStatus } from "react-dom";

export default function Button({
  text,
  type = "button",
  disabled = true,
  onClick,
}) {
  const { pending } = useFormStatus();

  return (
    <button
      onClick={onClick}
      className={`btn ${type === "submit" ? "from-btn" : ""}`}
      type={type}
      disabled={disabled || pending}
    >
      {text}
    </button>
  );
}
