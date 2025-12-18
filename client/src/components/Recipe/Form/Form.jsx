import useFetch from "../../../hooks/useFetch";
import { getTranslations } from "../../../utils/i18n";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";
import CustomSelect from "../../shared/CustomSelect/CustomSelect";
import ImagePreview from "../../shared/ImagePreview/ImagePreview";
import ServerError from "../../shared/ServerError/ServerError";
import Loader from "../../Loader/Loader";
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
  addInputHandlerInstructions,
  addInputHandlerIngredients,
  updateInstructionHandler,
  validateInstructionHandler,
  deleteInstructionHandler,
  updateIngredientHandler,
  validateIngredientHandler,
  deleteIngredientHandler,
}) {
  const { values: result, loading } = useFetch([], serverPaths.CATEGORIES);
  const t = getTranslations();

  const categories =
    type === types.EDIT
      ? result.filter((x) => x.id !== ids.DEFAULT_CATEGORY_ID)
      : result;

  const getTitle = () => {
    return type === types.CREATE ? t.createRecipe : t.editRecipe;
  };

  const getButtons = () => {
    if (type === types.CREATE) {
      return <Button text={t.createRecipe} type="submit" disabled={disabled} />;
    }

    return (
      <div className="form-btns-wrapper">
        <Button text={t.saveChanges} type="submit" disabled={disabled} />

        <Button
          text={t.close}
          type="button"
          disabled={false}
          onClick={backHandler}
        />
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section id="form-recipe" className="section-form">
      {serverError.message && (
        <ServerError error={serverError.message} key={serverError.time} />
      )}
      <h2 ref={formRef} className="form-title">
        {getTitle()}
      </h2>
      <form className="form" action={submitHandler}>
        <CustomInput
          label={t.title}
          error={errors.title}
          {...fieldHandler("title")}
        />

        <CustomInput
          tag="textarea"
          label={t.summary}
          error={errors.summary}
          {...fieldHandler("summary")}
        />

        <CustomInput
          label={t.neededTime}
          error={errors.neededTime}
          {...fieldHandler("neededTime")}
        />

        <CustomInput
          label={t.portions}
          type="number"
          error={errors.portions}
          {...fieldHandler("portions")}
        />

        <CustomSelect
          label={t.category}
          values={categories}
          {...fieldHandler("category")}
        />

        <div className={styles["form-recipe-wrapper"]}>
          <h4 className={styles["form-recipe-title"]}>{t.instructions}</h4>
          {instructions.map((instruction, index) => (
            <div key={index} className={styles["form-recipe-input-wrapper"]}>
              <CustomInput
                label={`${t.step} ${index + 1}`}
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
                title={t.delete}
              />
            </div>
          ))}
          <Button
            text={t.addInstruction}
            disabled={false}
            onClick={addInputHandlerInstructions}
          />
        </div>

        <div className={styles["form-recipe-wrapper"]}>
          <h4 className={styles["form-recipe-title"]}>{t.products}</h4>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles["form-recipe-input-wrapper"]}>
              <CustomInput
                key={index}
                label={`${t.product} ${index + 1}`}
                value={ingredient}
                onChange={(e) => updateIngredientHandler(index, e.target.value)}
                onBlur={() => validateIngredientHandler(index)}
                error={ingredientErrors[index]}
              />
              <i
                className="fas fa-times"
                onClick={() => deleteIngredientHandler(index)}
                title={t.delete}
              />
            </div>
          ))}
          <Button
            text={t.addProduct}
            disabled={false}
            onClick={addInputHandlerIngredients}
          />
        </div>

        {type === types.CREATE && currentImage && (
          <CustomInput
            label={t.currentImage}
            value={currentImage.name}
            disabled
          />
        )}

        {type === types.EDIT && currentImage && (
          <ImagePreview name={t.currentImage} currentImage={currentImage} />
        )}

        <CustomInput
          label={t.image}
          type="file"
          error={errors.image}
          {...fieldHandler("image")}
        />

        <CustomInput
          label={t.suitableForBaby}
          type="checkbox"
          error={errors.isBabySafe}
          {...fieldHandler("isBabySafe")}
        />

        {getButtons()}
      </form>
    </section>
  );
}
