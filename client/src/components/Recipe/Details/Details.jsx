import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useTop from "../../../hooks/useTop";
import useAuthContext from "../../../hooks/useAuthContext";
import useAction from "../../../hooks/useAction";
import Button from "../../shared/Button/Button";
import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { data } from "../../../utils/helpers/data";
import { httpMethods, serverPaths } from "../../../utils/constants/global";
import styles from "./Details.module.css";
import useFetch from "../../../hooks/useFetch";

export default function Details() {
  const { recipeId: id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [neededIngredients, setNeededIngredients] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuthContext();
  useTop();

  // todo check name values
  const { values } = useFetch({}, `${serverPaths.RECIPES}/${id}`);
  const { execute } = useAction();

  const categoryName = recipe?.category?.name;
  const categoryId = recipe?.category?._id;

  useEffect(() => {
    if (values.title) {
      const normalizedIngredients = data.map(
        values.ingredients,
        "isReady",
        false
      );
      const normalizedInstructions = data.map(
        values.instructions,
        "isReady",
        false
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecipe({
        ...values,
        ingredients: normalizedIngredients,
        instructions: normalizedInstructions,
      });
      setIsFav(values.isFav);
    }
  }, [values]);

  const deleteHandler = useCallback(async () => {
    try {
      await execute(`${serverPaths.RECIPES}/${id}`, httpMethods.DELETE, null);
      navigate(`/recipe/${categoryName}/${categoryId}`);
    } catch (err) {
      console.error(err.message);
    }
  }, [execute, categoryName, categoryId, id, navigate]);

  const likeHandler = async () => {
    try {
      const result = await execute(
        `${serverPaths.RECIPES}/${id}`,
        httpMethods.POST,
        null
      );
      setIsFav(result);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toogleHandler = (id) => {
    setRecipe((state) => ({
      ...state,
      ingredients: state.ingredients.map((x) =>
        x._id === id ? { ...x, isReady: !x.isReady } : x
      ),
      instructions: state.instructions.map((x) =>
        x._id === id ? { ...x, isReady: !x.isReady } : x
      ),
    }));
  };

  const neededIngredientsHandler = (ingredientId) => {
    if (neededIngredients.includes(ingredientId)) {
      setNeededIngredients((state) => state.filter((x) => x !== ingredientId));
    } else {
      setNeededIngredients((state) => [...state, ingredientId]);
    }
  };

  const createNoteHandler = async () => {
    if (!neededIngredients.length) {
      return;
    }
    const result = [];

    for (const curr of neededIngredients) {
      result.push(recipe.ingredients.find((x) => x._id === curr).description);
    }

    const data = {
      description: result.join("\n"),
      isList: true,
    };

    try {
      await execute(serverPaths.NOTES, httpMethods.POST, data);
      navigate("/notes");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getIconTitle = (ingredientId) => {
    return neededIngredients.includes(ingredientId)
      ? "Махни от списъка за пазаруване"
      : "Добави в списъка за пазаруване";
  };

  const getIcon = (ingredientId) => {
    return neededIngredients.includes(ingredientId)
      ? "fa-check"
      : "fa-basket-shopping";
  };

  const isOwner = () => {
    return user.id === recipe.author._id;
  };

  if (!recipe?.title) {
    return <Loader />;
  }

  return (
    <section id={styles.details}>
      <div className={styles["details-top-wrapper"]}>
        <div className="details-top-left-wrapper">
          <div className={styles["details-top-img-wrapper"]}>
            <img src={image.getImageUrl(recipe.image)} alt={recipe.title} />
            {isFav ? (
              <i
                className="fa-solid fa-heart"
                title="Премахни от любими"
                onClick={likeHandler}
              ></i>
            ) : (
              <i
                className="fa-regular fa-heart"
                title="Добави в любими"
                onClick={likeHandler}
              ></i>
            )}
          </div>
          <ul className={styles["details-top-icon-list"]}>
            <li className={styles["details-top-icon-item"]}>
              <i className="fa-solid fa-users" title="Брой порции"></i>
              {recipe.portions}
            </li>
            <li className={styles["details-top-icon-item"]}>
              <i className="fa-solid fa-clock" title="Необходимо време"></i>
              {recipe.neededTime}
            </li>
            {recipe.isBabySafe && (
              <li className={styles["details-top-icon-item"]}>
                <i className="fa-solid fa-baby" title="Подходящо за бебе"></i>
                Подходящо за бебета
              </li>
            )}
            <li className={styles["details-top-icon-item"]}>
              <i className="fa-solid fa-list" title="Категория"></i>
              <Link
                to={`/recipe/${recipe?.category?.name}/${recipe?.category?._id}`}
              >
                {recipe?.category?.name}
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles["details-top-right-wrapper"]}>
          <h2 className={styles["details-top-title"]}>{recipe.title}</h2>
          <p className={styles["details-top-summary"]}>{recipe.summary}</p>
          <div className={styles["details-top-ingredients-wrapper"]}>
            <h4 className={styles["details-top-ingredients-title"]}>
              Необходими продукти
            </h4>
            <ul className={styles["details-top-ingredients-list"]}>
              {recipe.ingredients.map((x) => (
                <li
                  key={x._id}
                  className={`${styles["details-top-ingredients-item"]} ${
                    x.isReady ? styles["details-ready"] : ""
                  }`}
                >
                  <i
                    className={`fa-solid ${getIcon(x._id)}`}
                    title={getIconTitle(x._id)}
                    onClick={() => neededIngredientsHandler(x._id)}
                  ></i>
                  <span onClick={() => toogleHandler(x._id)}>
                    {x.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Button
            text="Създай бележка за пазаруване"
            disabled={false}
            onClick={createNoteHandler}
          />
        </div>
      </div>

      <div className={styles["details-bottom-wrapper"]}>
        <h3 className={styles["details-bottom-title"]}>Стъпки за приготвяне</h3>
        {recipe.instructions.map((x, i) => (
          <p
            key={x._id}
            className={`${styles["details-bottom-content"]} ${
              x.isReady ? styles["details-ready"] : ""
            }`}
            onClick={() => toogleHandler(x._id)}
          >
            <span>{`Стъпка ${i + 1}`}</span>
            {x.description}
          </p>
        ))}
      </div>

      {isOwner() && (
        <div className={styles["details-buttons-wrapper"]}>
          <ButtonLink path={`/recipe/edit/${id}`} text="Редактирай" />
          <Button text="Изтрий" disabled={false} onClick={deleteHandler} />
        </div>
      )}
    </section>
  );
}
