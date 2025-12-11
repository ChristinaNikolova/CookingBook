import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";
import CustomSelect from "../../shared/CustomSelect/CustomSelect";
import ImagePreview from "../../shared/ImagePreview/ImagePreview";
import ServerError from "../../shared/ServerError/ServerError";
import { ids, serverPaths, types } from "../../../utils/constants/global";
import styles from "./Form.module.css";

export default function FormRecipe({
  type,
  instructions,
  ingredients,
  currentImage,
  serverError,
  formRef,
  errors,
  disabled,
  instructionErrors,
  ingredientErrors,
  submitHandler,
  fieldHandler,
  backHandler,
  addInputHandler,
  updateInstructionHandler,
  validateInstructionHandler,
  deleteInstructionHandler,
  updateIngredientHandler,
  validateIngredientHandler,
  deleteIngredientHandler,
}) {
  const [categories, setCategories] = useState([]);
  const { values } = useFetch([], serverPaths.CATEGORIES);

  useEffect(() => {
    if (values) {
      let result = values;

      if (type === types.EDIT) {
        result = result.filter((x) => x.id !== ids.DEFAULT_CATEGORY_ID);
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategories(result);
    }
  }, [values, type]);

  const getTitle = () => {
    return type === types.CREATE ? "Създай рецепта" : "Редактирай рецептата";
  };

  const getButtons = () => {
    if (type === types.CREATE) {
      return <Button text="Създай рецепта" type="submit" disabled={disabled} />;
    }

    return (
      <div className="form-btns-wrapper">
        <Button text="Запази промените" type="submit" disabled={disabled} />

        <Button
          text="Затвори"
          type="button"
          disabled={false}
          onClick={backHandler}
        />
      </div>
    );
  };

  return (
    <section id="form-recipe" className="section-form">
      {serverError && <ServerError error={serverError} />}
      <h2 ref={formRef} className="form-title">
        {getTitle()}
      </h2>
      <form className="form" action={submitHandler}>
        <CustomInput
          label="Заглавие"
          error={errors.title}
          {...fieldHandler("title")}
        />

        <CustomInput
          tag="textarea"
          label="Резюме"
          error={errors.summary}
          {...fieldHandler("summary")}
        />

        <CustomInput
          label="Необходимо време"
          error={errors.neededTime}
          {...fieldHandler("neededTime")}
        />

        <CustomInput
          label="Брой порции"
          type="number"
          error={errors.portions}
          {...fieldHandler("portions")}
        />

        <CustomSelect
          label="Категория"
          values={categories}
          {...fieldHandler("category")}
        />

        <div className={styles["form-recipe-wrapper"]}>
          <h4 className={styles["form-recipe-title"]}>Инструкции</h4>
          {instructions.map((instruction, index) => (
            <div key={index} className={styles["form-recipe-input-wrapper"]}>
              <CustomInput
                label={`Стъпка ${index + 1}`}
                value={instruction}
                onChange={(e) =>
                  updateInstructionHandler(index, e.target.value)
                }
                onBlur={() => validateInstructionHandler(index)}
                error={instructionErrors[index]}
              />
              <i
                className="fas fa-times"
                onClick={() => deleteInstructionHandler(index)}
                title="Изтрий"
              />
            </div>
          ))}
          <Button
            text=" + инструкция"
            disabled={false}
            onClick={() => addInputHandler("instruction")}
          />
        </div>

        <div className={styles["form-recipe-wrapper"]}>
          <h4 className={styles["form-recipe-title"]}>Продукти</h4>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles["form-recipe-input-wrapper"]}>
              <CustomInput
                key={index}
                label={`Продукт ${index + 1}`}
                value={ingredient}
                onChange={(e) => updateIngredientHandler(index, e.target.value)}
                onBlur={() => validateIngredientHandler(index)}
                error={ingredientErrors[index]}
              />
              <i
                className="fas fa-times"
                onClick={() => deleteIngredientHandler(index)}
                title="Изтрий"
              />
            </div>
          ))}
          <Button
            text="+ продукт"
            disabled={false}
            onClick={() => addInputHandler("ingredient")}
          />
        </div>

        {type === types.CREATE && currentImage && (
          <CustomInput
            label="Текущо изображение"
            value={currentImage.name}
            disabled
          />
        )}

        {type === types.EDIT && currentImage && (
          <ImagePreview name="Текущо изображение" currentImage={currentImage} />
        )}

        <CustomInput
          label="Изображение"
          type="file"
          error={errors.image}
          {...fieldHandler("image")}
        />

        <CustomInput
          label="Подходящо за бебе"
          type="checkbox"
          error={errors.isBabySafe}
          {...fieldHandler("isBabySafe")}
        />

        {getButtons()}
      </form>
    </section>
  );
}
