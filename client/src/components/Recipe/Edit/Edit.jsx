import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useConfigToken from "../../../hooks/useConfigToken";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";
import CustomSelect from "../../shared/CustomSelect/CustomSelect";
import ServerError from "../../shared/ServerError/ServerError";
import { validator } from "../../../utils/helpers/validator";
import requester from "../../../utils/helpers/requester";
import { httpMethods, ids } from "../../../utils/constants/global";
import styles from "./Edit.module.css";
import ImagePreview from "../../shared/ImagePreview/ImagePreview";
import { image } from "../../../utils/helpers/image";

// todo test update without hanging the category!!!

const initialValues = {
  title: "",
  summary: "",
  neededTime: "",
  portions: "",
  category: "",
  image: "",
  isBabySafe: false,
};

// todo add lines
export default function EditRecipe() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState("");
  const [instructions, setInstructions] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [instructionErrors, setInstructionErrors] = useState([]);
  const [ingredientErrors, setIngredientErrors] = useState([]);
  const [instructionsTouched, setInstructionsTouched] = useState([]);
  const [ingredientsTouched, setIngredientsTouched] = useState([]);
  const [categories, setCategories] = useState([]);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const config = useConfigToken();
  const formRef = useRef();

  const {
    fieldHandler,
    submitHandler,
    errors,
    disabledForm,
    files,
    values,
    setValues,
  } = useForm(editHandler, "recipe", initialValues, formRef);

  useEffect(() => {
    requester("/categories", httpMethods.GET, null, config)
      .then((res) => {
        const result = res.filter((x) => x.id !== ids.DEFAULT_CATEGORY_ID);
        setCategories(result);
      })
      .catch((err) => console.error(err));
  }, [config]);

  useEffect(() => {
    requester(`/recipes/${id}`, httpMethods.GET, null, config)
      .then((res) => {
        setValues(res);
        setCurrentImage(image.getImageUrl(res.image));
      })
      .catch((err) => console.error(err));
  });

  async function editHandler(data) {
    setServerError("");

    data.append(
      "instructions",
      JSON.stringify(instructions.filter((i) => i.trim()))
    );
    data.append(
      "ingredients",
      JSON.stringify(ingredients.filter((i) => i.trim()))
    );

    try {
      if (!files.image) {
        delete data.image;
      }

      const result = await requester(
        `/recipes/${id}`,
        httpMethods.PUT,
        data,
        config
      );
      navigate(`/recipe/${result.id}`);
    } catch (err) {
      setServerError(err.message);
      setCurrentImage(files.image);
    }
  }

  const addInputHandler = (name) => {
    name === "ingredient"
      ? setIngredients([...ingredients, ""])
      : setInstructions([...instructions, ""]);
  };

  const updateInstructionHandler = (index, value) => {
    updateStateHandler(index, value, instructions, setInstructions);
  };

  const validateInstructionHandler = (index) => {
    updateStateHandler(
      index,
      true,
      instructionsTouched,
      setInstructionsTouched
    );

    const error = validator.validateInstruction(instructions[index]);
    updateStateHandler(index, error, instructionErrors, setInstructionErrors);
  };

  const deleteInstructionHandler = (index) => {
    deleteHandler(index, instructions, setInstructions);
    deleteHandler(index, instructionErrors, setInstructionErrors);
    deleteHandler(index, instructionsTouched, setInstructionsTouched);
  };

  const updateIngredientHandler = (index, value) => {
    updateStateHandler(index, value, ingredients, setIngredients);
  };

  const validateIngredientHandler = (index) => {
    updateStateHandler(index, true, ingredientsTouched, setIngredientsTouched);

    const error = validator.validateIngredient(ingredients[index]);
    updateStateHandler(index, error, ingredientErrors, setIngredientErrors);
  };

  const deleteIngredientHandler = (index) => {
    deleteHandler(index, ingredients, setIngredients);
    deleteHandler(index, ingredientErrors, setIngredientErrors);
    deleteHandler(index, ingredientsTouched, setIngredientsTouched);
  };

  const updateStateHandler = (index, newValue, values, setFunc) => {
    const newValues = [...values];
    newValues[index] = newValue;
    setFunc(newValues);
  };

  const deleteHandler = (index, values, setValues) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
  };

  const isFormValid = () => {
    const hasInstructionErrors = areErrors(instructions, "validateInstruction");
    const hasIngredientErrors = areErrors(ingredients, "validateIngredient");

    return (
      !disabledForm() &&
      !hasInstructionErrors &&
      !hasIngredientErrors &&
      values.category !== initialValues.category &&
      files.image
    );
  };

  const areErrors = (input, validatorFunc) => {
    return input.some((x) => validator[validatorFunc](x));
  };

  const backHandler = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <section id="create-recipe" className="section-form">
      {serverError && <ServerError error={serverError} />}
      <h2 ref={formRef} className="form-title">
        Добави нова рецепта
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

        <div className={styles["create-recipe-wrapper"]}>
          <h4 className={styles["create-recipe-title"]}>Инструкции</h4>
          {instructions.map((instruction, index) => (
            <div key={index} className={styles["create-recipe-input-wrapper"]}>
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

        <div className={styles["create-recipe-wrapper"]}>
          <h4 className={styles["create-recipe-title"]}>Продукти</h4>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles["create-recipe-input-wrapper"]}>
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

        {currentImage && (
          <CustomInput
            label="Текущо изображение"
            value={currentImage.name}
            disabled
          />
        )}

        {currentImage && (
          <ImagePreview name="Текущо изображение" currentImage={currentImage} />
        )}

        <CustomInput
          label="Качи снимка"
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

        <div className="form-btns-wrapper">
          <Button
            text="Запази промените"
            type="submit"
            disabled={!isFormValid()}
          />
          <Button
            text="Затвори"
            type="button"
            disabled={false}
            onClick={backHandler}
          />
        </div>
      </form>
    </section>
  );
}
