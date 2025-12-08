import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useConfigToken from "../../../hooks/useConfigToken";
import NoContent from "../../NoContent/NoContent";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import requester from "../../../utils/helpers/requester";
import { image } from "../../../utils/helpers/image";
import { httpMethods, serverPaths } from "../../../utils/constants/global";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("searched") || "";
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const config = useConfigToken();

  useEffect(() => {
    requester(
      `${serverPaths.RECIPES_SEARCH}/${query}`,
      httpMethods.GET,
      null,
      config
    )
      .then((res) => setSearchedRecipes(res))
      .catch((err) => console.error(err));
  }, [query, config]);

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
