import { useSearchParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { getTranslations } from "../../../utils/i18n";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { serverPaths } from "../../../utils/constants/global";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("searched") || "";
  const t = getTranslations();

  const { values: searchedRecipes, loading } = useFetch(
    [],
    `${serverPaths.RECIPES_SEARCH}/${query}`
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <section id="fav-recipes">
      <ListWrapper title={`${t.searchResults}: ${query}`}>
        {!searchedRecipes.length ? (
          <NoContent
            title={`${t.recipesContaining} ${query}`}
            path="/recipe/create"
          />
        ) : (
          searchedRecipes.map((x) => (
            <RecipeItem
              key={x.id}
              id={x.id}
              title={x.title}
              image={image.getImageUrl(x.image)}
            />
          ))
        )}
      </ListWrapper>
    </section>
  );
}
