import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useTop from "../../../hooks/useTop";
import useConfigToken from "../../../hooks/useConfigToken";
import Button from "../../shared/Button/Button";
import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import Loader from "../../Loader/Loader";
import requester from "../../../utils/helpers/requester";
import { image } from "../../../utils/helpers/image";
import { httpMethods } from "../../../utils/constants/global";
import styles from "./Details.module.css";

// todo line through ingredient / step
// todo add no content case
// todo check useEffects dep array

export default function Details() {
  const { recipeId: id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();
  const config = useConfigToken();
  useTop();

  useEffect(() => {
    requester(`/recipes/${id}`, httpMethods.GET, null, config)
      .then((res) => {
        setRecipe(res);
        setIsFav(res.isFav);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const deleteHandler = async () => {
    try {
      await requester(`/recipes/${id}`, httpMethods.DELETE, null, config);
      navigate(`/recipe/${recipe.category.name}/${recipe.category._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const likeHandler = async () => {
    try {
      const result = await requester(
        `/recipes/${id}`,
        httpMethods.POST,
        null,
        config
      );
      setIsFav(result);
    } catch (err) {
      console.error(err);
    }
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
                to={`/recipe/${recipe.category.name}/${recipe.category._id}`}
              >
                {recipe.category.name}
              </Link>
            </li>
          </ul>
        </div>

        <div className="details-top-right-wrapper">
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
                  className={styles["details-top-ingredients-item"]}
                >
                  {x.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles["details-bottom-wrapper"]}>
        <h3 className={styles["details-bottom-title"]}>Стъпки за приготвяне</h3>
        {recipe.instructions.map((x, i) => (
          <p key={x._id} className={styles["details-bottom-content"]}>
            <span>{`Стъпка ${i + 1}`}</span>
            {x.description}
          </p>
        ))}
      </div>

      <div className={styles["details-buttons-wrapper"]}>
        <ButtonLink path="/edit" text="Редактирай" />
        <Button text="Изтрий" disabled={false} onClick={deleteHandler} />
      </div>
    </section>
  );
}
