import { Link } from "react-router-dom";

export default function ButtonLink({ path, text, disabled = false }) {
  const clickHandler = (e) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <Link
      to={path}
      className={`btn ${disabled ? "disabled" : ""}`}
      onClick={clickHandler}
    >
      {text}
    </Link>
  );
}
