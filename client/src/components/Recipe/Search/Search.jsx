import { useSearchParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { serverPaths } from "../../../utils/constants/global";

const initialValues = [];

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("searched") || "";

  const { values: searchedRecipes, loading } = useFetch(
    initialValues,
    `${serverPaths.RECIPES_SEARCH}/${query}`
  );

  // to do use effect quety dep appa

  if (loading) {
    return <Loader />;
  }

  return (
    <section id="fav-recipes">
      <ListWrapper title={`Резултати от търсенето: ${query}`}>
        {!searchedRecipes.length ? (
          <NoContent
            title={`рецепти, съдържащи ${query}`}
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
