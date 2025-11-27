import { Link } from "react-router-dom";

export default function ButtonLink({ path, text }) {
  return (
    <Link to={path} className="btn">
      {text}
    </Link>
  );
}
