import useFetch from "../../../hooks/useFetch";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";
import NoContent from "../../NoContent/NoContent";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { serverPaths } from "../../../utils/constants/global";

const initialValues = [];

export default function LastThree() {
  const { values: lastThreeRecipes, loading } = useFetch(
    initialValues,
    serverPaths.USERS
  );

  if (loading) {
    return <Loader />;
  }

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
