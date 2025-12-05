import { useEffect, useState } from "react";
import useConfigToken from "../../../../hooks/useConfigToken";
import ListWrapper from "../../ListWrapper/ListWrapper";
import ListItem from "../../ListItem/ListItem";
import requester from "../../../../utils/requester";
import { httpMethods } from "../../../../utils/constants/global";
import styles from "./All.module.css";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const config = useConfigToken();

  useEffect(() => {
    requester("/admin/recipes", httpMethods.GET, null, config)
      .then((res) => setRecipes(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id={styles["admin-all-categories"]}>
      <ListWrapper title="Рецепти">
        {recipes.map((x) => (
          <ListItem key={x.id} id={x.id} name={x.title} />
        ))}
      </ListWrapper>
    </section>
  );
}
