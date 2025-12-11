import {
  startTransition,
  useCallback,
  useEffect,
  useOptimistic,
  useState,
} from "react";
import useFetch from "../../../../hooks/useFetch";
import useAction from "../../../../hooks/useAction";
import ListWrapper from "../../ListWrapper/ListWrapper";
import ListItem from "../../ListItem/ListItem";
import NoContent from "../../../NoContent/NoContent";
import Loader from "../../../Loader/Loader";
import { recipesReducer } from "../../../../utils/reducers/recipes";
import { data } from "../../../../utils/helpers/data";
import { httpMethods, serverPaths } from "../../../../utils/constants/global";
import styles from "./All.module.css";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [optimisticRecipes, dispatchOptimisticRecipes] = useOptimistic(
    recipes,
    recipesReducer
  );

  const { values: result, loading } = useFetch([], serverPaths.ADMIN_RECIPES);
  const { execute } = useAction();

  useEffect(() => {
    if (result.length) {
      const normalizedRecipes = data.map(result, "pending", false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecipes(normalizedRecipes);
    }
  }, [result]);

  const deleteHandler = useCallback(
    async (recipeId) => {
      setRecipes((state) =>
        state.map((x) => (x.id === recipeId ? { ...x, pending: true } : x))
      );

      startTransition(() => {
        dispatchOptimisticRecipes({
          type: "DELETE",
          payload: recipeId,
        });
      });

      try {
        await execute(
          `${serverPaths.ADMIN_RECIPES}/${recipeId}`,
          httpMethods.DELETE
        );
        setRecipes((state) => state.filter((x) => x.id !== recipeId));
      } catch (err) {
        console.error(err.message);
      }
    },
    [dispatchOptimisticRecipes, execute]
  );

  if (loading) {
    return <Loader />;
  }

  if (!recipes.length) {
    return <NoContent title="рецепти" path="/recipe/create" />;
  }

  return (
    <section id={styles["admin-all-categories"]}>
      <ListWrapper title="Рецепти">
        {optimisticRecipes.map((x) => (
          <ListItem
            key={x.id}
            id={x.id}
            name={x.title}
            pending={x.pending}
            onDelete={deleteHandler}
          />
        ))}
      </ListWrapper>
    </section>
  );
}
