import useFetch from "../../../hooks/useFetch";
import { getTranslations } from "../../../utils/i18n";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { serverPaths } from "../../../utils/constants/global";

export default function Favourite() {
  const { values: favRecipes, loading } = useFetch([], serverPaths.USERS_FAV);
  const t = getTranslations();

  if (loading) {
    return <Loader />;
  }

  return (
    <section id="fav-recipes">
      <ListWrapper title={t.favouriteRecipes}>
        {!favRecipes.length ? (
          <NoContent title={t.favouriteRecipes} path="/recipe/create" />
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
