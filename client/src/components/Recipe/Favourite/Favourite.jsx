import useFetch from "../../../hooks/useFetch";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { serverPaths } from "../../../utils/constants/global";

export default function Favourite() {
  const { values: favRecipes, loading } = useFetch([], serverPaths.USERS_FAV);

  if (loading) {
    return <Loader />;
  }

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
