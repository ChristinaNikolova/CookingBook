import useTop from "../../../hooks/useTop";
import ListWrapper from "../ListWrapper/ListWrapper";
import RecipeItem from "../RecipeItem/RecipeItem";

// todo add last three on home page
// todo initialValues

export default function All() {
  useTop();

  return (
    <section id="recipes">
      <ListWrapper title="Име на категорията">
        <RecipeItem
          id="1"
          title="Заглавие"
          img="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
        />
        <RecipeItem
          id="1"
          title="Заглавие"
          img="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
        />
        <RecipeItem
          id="1"
          title="Заглавие"
          img="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
        />
        <RecipeItem
          id="1"
          title="Заглавие"
          img="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
        />
        <RecipeItem
          id="1"
          title="Заглавие"
          img="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
        />
        <RecipeItem
          id="1"
          title="Заглавие"
          img="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
        />
      </ListWrapper>
    </section>
  );
}
