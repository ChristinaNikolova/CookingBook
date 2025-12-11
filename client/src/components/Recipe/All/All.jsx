import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useTop from "../../../hooks/useTop";
import useConfigToken from "../../../hooks/useConfigToken";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import Pagination from "../../shared/Pagination/Pagination";
import requester from "../../../utils/helpers/requester";
import { image } from "../../../utils/helpers/image";
import {
  directions,
  httpMethods,
  serverPaths,
} from "../../../utils/constants/global";

export default function All() {
  const { categoryName, categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page") ?? 1);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pagesCount, setPagesCount] = useState(1);
  const [recipes, setRecipes] = useState([]);

  const config = useConfigToken();
  useTop();

  useEffect(() => {
    requester(
      `${serverPaths.RECIPES_CATEGORY}/${categoryId}/${currentPage}`,
      httpMethods.GET,
      null,
      config
    )
      .then((res) => {
        setRecipes(res.recipe);
        setPagesCount(res.pagesCount);

        const newPage = Number(res.currentPage);
        if (currentPage !== newPage) {
          setCurrentPage(newPage);
        }
      })
      .catch((err) => console.error(err.message));
  }, [config, categoryId, currentPage]);

  const paginationHandler = (direction) => {
    const value = direction === directions.PREV ? -1 : 1;
    setCurrentPage((state) => state + value);
  };

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
