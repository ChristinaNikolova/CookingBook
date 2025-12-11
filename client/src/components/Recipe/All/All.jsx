import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import useTop from "../../../hooks/useTop";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import Pagination from "../../shared/Pagination/Pagination";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { directions, serverPaths } from "../../../utils/constants/global";

export default function All() {
  const { categoryName, categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page") ?? 1);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pagesCount, setPagesCount] = useState(1);
  const [recipes, setRecipes] = useState([]);

  useTop();

  // todo check loading
  const { values, loading } = useFetch(
    {},
    `${serverPaths.RECIPES_CATEGORY}/${categoryId}/${currentPage}`
  );

  useEffect(() => {
    if (values.recipes) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecipes(values.recipes);
      setPagesCount(values.pagesCount);

      const newPage = Number(values.currentPage);
      if (currentPage !== newPage) {
        setCurrentPage(newPage);
      }
    }
  }, [currentPage, values]);

  const paginationHandler = (direction) => {
    const value = direction === directions.PREV ? -1 : 1;
    setCurrentPage((state) => state + value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section id="recipes">
      <ListWrapper title={categoryName}>
        {!recipes.length ? (
          <NoContent title="рецепти" path="/recipe/create" />
        ) : (
          recipes.map((x) => (
            <RecipeItem
              key={x.id}
              id={x.id}
              title={x.title}
              image={image.getImageUrl(x.image)}
            />
          ))
        )}
      </ListWrapper>
      <Pagination
        currentPage={currentPage}
        pagesCount={pagesCount}
        categoryId={categoryId}
        categoryName={categoryName}
        onClick={paginationHandler}
      />
    </section>
  );
}
