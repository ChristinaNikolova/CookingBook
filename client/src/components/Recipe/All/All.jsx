import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTop from "../../../hooks/useTop";
import useConfigToken from "../../../hooks/useConfigToken";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import requester from "../../../utils/helpers/requester";
import { image } from "../../../utils/helpers/image";
import { httpMethods } from "../../../utils/constants/global";

// todo add last three on home page

export default function All() {
  const { categoryName, categoryId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const config = useConfigToken();
  useTop();

  useEffect(() => {
    requester(
      `/recipes/byCategory/${categoryId}`,
      httpMethods.GET,
      null,
      config
    )
      .then((res) => setRecipes(res))
      .catch((err) => console.error(err));
  }, []);

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
    </section>
  );
}
