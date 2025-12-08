import { Link } from "react-router-dom";
import { directions } from "../../../utils/constants/global";

// import { directions } from "../../../utils/constants/global";

// import styles from "./Pagination.module.css";

export default function Pagination({
  currentPage,
  pagesCount,
  categoryId,
  categoryName,
  onClick,
}) {
  return (
    <div className="pagination-wrapper">
      {currentPage !== 1 && (
        <Link
          onClick={() => onClick(directions.PREV)}
          className="pagination"
          to={`/recipe/${categoryName}/${categoryId}?page=${currentPage - 1}`}
        >
          Newer recipes
        </Link>
      )}
      {currentPage !== pagesCount && (
        <Link
          onClick={() => onClick(directions.NEXT)}
          className="pagination"
          to={`/recipe/${categoryName}/${categoryId}?page=${currentPage + 1}`}
        >
          Older recipes
        </Link>
      )}
    </div>
  );
}
