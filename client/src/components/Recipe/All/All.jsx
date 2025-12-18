import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import useTop from "../../../hooks/useTop";
import { getTranslations } from "../../../utils/i18n";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import Pagination from "../../shared/Pagination/Pagination";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { directions, serverPaths } from "../../../utils/constants/global";

export default function All() {
  const { categoryName, categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);
  const t = getTranslations();

  const [recipes, setRecipes] = useState([]);
  const [pagesCount, setPagesCount] = useState(1);

  useTop(setSearchParams);
  const { values: result, loading } = useFetch(
    {},
    `${serverPaths.RECIPES_CATEGORY}/${categoryId}/${currentPage}`
  );

  useEffect(() => {
    if (result.recipes) {
      setRecipes(result.recipes);
      setPagesCount(result.pagesCount);
    }
  }, [result]);

  const paginationHandler = (direction) => {
    const value = direction === directions.PREV ? -1 : 1;
    setSearchParams({ page: currentPage + value });
  };

  const isContent = () => {
    return recipes.length;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section id="recipes">
      <ListWrapper title={categoryName}>
        {!isContent() ? (
          <NoContent title={t.recipesLower} path="/recipe/create" />
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
      {isContent() && (
        <Pagination
          currentPage={currentPage}
          pagesCount={pagesCount}
          categoryId={categoryId}
          categoryName={categoryName}
          onClick={paginationHandler}
        />
      )}
    </section>
  );
}
