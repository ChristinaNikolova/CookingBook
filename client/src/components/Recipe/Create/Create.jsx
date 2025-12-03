// todo rename to steps

import { useRef, useState } from "react";
import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";
import CustomSelect from "../../shared/CustomSelect/CustomSelect";
import { validator } from "../../../utils/validator";
import styles from "./Create.module.css";

const initialValues = {
  title: "",
  summary: "",
  neededTime: "",
  portions: "",
  category: "preMeal",
  image: "",
  isBabySafe: false,
};

export default function CreateRecipe() {
  const [instructions, setInstructions] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [instructionErrors, setInstructionErrors] = useState([]);
  const [ingredientErrors, setIngredientErrors] = useState([]);
  const [instructionsTouched, setInstructionsTouched] = useState([]);
  const [ingredientsTouched, setIngredientsTouched] = useState([]);
  const formRef = useRef();

  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    createHandler,
    "recipe",
    initialValues,
    formRef
  );

  async function createHandler({
    title,
    summary,
    neededTime,
    portions,
    category,
    image,
    isBabySafe,
  }) {
    // todo add validations
    // todo trim data

    const fullData = {
      title,
      summary,
      neededTime,
      portions,
      image,
      category,
      isBabySafe,
      instructions: instructions.filter((i) => i.trim()),
      ingredients: ingredients.filter((i) => i.trim()),
    };

    console.log(fullData);
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

    return !disabledForm() && !hasInstructionErrors && !hasIngredientErrors;
  };

  const areErrors = (input, validatorFunc) => {
    return input.some((x) => validator[validatorFunc](x));
  };

  return (
    <section id="create-recipe" className="section-form">
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

        <CustomSelect label="Категория" {...fieldHandler("category")} />

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

        <Button text="Създай рецепта" type="submit" disabled={!isFormValid()} />
      </form>
    </section>
  );
}
