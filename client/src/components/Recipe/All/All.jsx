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
import { directions, httpMethods } from "../../../utils/constants/global";

export default function All() {
  const { categoryName, categoryId } = useParams();

  const [searchParams] = useSearchParams();
  const page = searchParams?.get("page") ? searchParams.get("page") : "1";
  // todo use number
  const [currentPage, setCurrentPage] = useState(page);
  const [pagesCount, setPagesCount] = useState(1);

  const [recipes, setRecipes] = useState([]);
  const config = useConfigToken();
  useTop();

  useEffect(() => {
    requester(
      `/recipes/byCategory/${categoryId}/${currentPage}`,
      httpMethods.GET,
      null,
      config
    )
      .then((res) => {
        setRecipes(res.recipe);
        setCurrentPage(Number(res.currentPage));
        setPagesCount(res.pagesCount);

        console.log(res);
      })
      .catch((err) => console.error(err));
  }, [config, categoryId, currentPage]);

  const paginationHandler = (direction) => {
    const value = direction === directions.PREV ? -1 : 1;
    setCurrentPage(currentPage + value);
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
