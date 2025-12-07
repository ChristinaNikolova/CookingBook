import { useEffect, useState } from "react";
import useConfigToken from "../../../hooks/useConfigToken";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import requester from "../../../utils/helpers/requester";
import { image } from "../../../utils/helpers/image";
import { httpMethods } from "../../../utils/constants/global";

export default function Favourite() {
  const [favRecipes, setFavRecipes] = useState([]);
  const config = useConfigToken();

  useEffect(() => {
    requester("/users/fav", httpMethods.GET, null, config)
      .then((res) => setFavRecipes(res))
      .catch((err) => console.error(err));
  }, [config]);

  return (
    <section id="fav-recipes">
      <ListWrapper title="Любими рецепти">
        {!favRecipes.length ? (
          <NoContent title="Любими рецепти" path="/recipe/create" />
        ) : (
          favRecipes.map((x) => (
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
