import { memo } from "react";
import { Link } from "react-router-dom";

function ButtonLink({ path, text, disabled = false }) {
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

export default memo(ButtonLink);
