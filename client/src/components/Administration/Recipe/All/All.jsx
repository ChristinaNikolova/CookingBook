import {
  startTransition,
  useCallback,
  useEffect,
  useOptimistic,
  useState,
} from "react";
import useConfigToken from "../../../../hooks/useConfigToken";
import ListWrapper from "../../ListWrapper/ListWrapper";
import ListItem from "../../ListItem/ListItem";
import NoContent from "../../../NoContent/NoContent";
import requester from "../../../../utils/helpers/requester";
import { recipesReducer } from "../../../../utils/reducers/recipes";
import { data } from "../../../../utils/helpers/data";
import { httpMethods } from "../../../../utils/constants/global";
import styles from "./All.module.css";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [optimisticRecipes, dispatchOptimisticRecipes] = useOptimistic(
    recipes,
    recipesReducer
  );
  const config = useConfigToken();

  useEffect(() => {
    requester("/admin/recipes", httpMethods.GET, null, config)
      .then((res) => {
        const normalizedRecipes = data.map(res, "pending", false);
        setRecipes(normalizedRecipes);
      })
      .catch((err) => console.error(err));
  }, [config]);

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
        await requester(
          `/admin/recipes/${recipeId}`,
          httpMethods.DELETE,
          null,
          config
        );

        setRecipes((state) => state.filter((x) => x.id !== recipeId));
      } catch (err) {
        console.error(err);
      }
    },
    [config, dispatchOptimisticRecipes]
  );

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
