import useFetch from "../../../hooks/useFetch";
import { getTranslations } from "../../../utils/i18n";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { serverPaths } from "../../../utils/constants/global";

export default function LastThree() {
  const { values: lastThreeRecipes, loading } = useFetch([], serverPaths.USERS);
  const t = getTranslations();

  if (loading) {
    return <Loader />;
  }

  return (
    <section id="last-three">
      <ListWrapper title={t.lastAddedRecipes}>
        {!lastThreeRecipes.length ? (
          <NoContent title={t.lastAdded} path="/recipe/create" />
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
