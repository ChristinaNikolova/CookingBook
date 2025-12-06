import { useEffect, useState } from "react";
import useConfigToken from "../../../hooks/useConfigToken";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import requester from "../../../utils/helpers/requester";
import { image } from "../../../utils/helpers/image";
import { httpMethods } from "../../../utils/constants/global";

export default function LastThree() {
  const [lastThreeRecipes, setLastThreeRecipes] = useState([]);
  const config = useConfigToken();

  useEffect(() => {
    requester("/users", httpMethods.GET, null, config)
      .then((res) => setLastThreeRecipes(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="last-three">
      <ListWrapper title="Последно добавени рецепти">
        {!lastThreeRecipes.length ? (
          <NoContent title="Последно добавени" path="/recipe/create" />
        ) : (
          lastThreeRecipes.map((x) => (
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
