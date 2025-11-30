// todo адд categorydrop down
// todo rename to steps

import { useState } from "react";
import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";
import { validator } from "../../../utils/validator";
import styles from "./Create.module.css";

const initialValues = {
  title: "",
  summary: "",
  neededTime: "",
  portions: "",
  image: "",
  isBabySafe: false,
};

export default function Create() {
  const [instructions, setInstructions] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [instructionErrors, setInstructionErrors] = useState([]);
  const [ingredientErrors, setIngredientErrors] = useState([]);
  const [instructionsTouched, setInstructionsTouched] = useState([]);
  const [ingredientsTouched, setIngredientsTouched] = useState([]);

  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    createHandler,
    "recipe",
    initialValues
  );

  async function createHandler({
    title,
    summary,
    neededTime,
    portions,
    image,
    isBabySafe,
  }) {
    // todo add validations
    // todo disabled button during fetch
    // todo trim data

    const fullData = {
      title,
      summary,
      neededTime,
      portions,
      image,
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
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const validateInstructionHandler = (index) => {
    const newTouched = [...instructionsTouched];
    newTouched[index] = true;
    setInstructionsTouched(newTouched);

    const newErrors = [...instructionErrors];
    newErrors[index] = validator.validateInstruction(instructions[index]);
    setInstructionErrors(newErrors);
  };

  const deleteInstructionHandler = (index) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);

    instructionErrors.splice(index, 1);
    setInstructionErrors(instructionErrors);

    instructionsTouched.splice(index, 1);
    setInstructionsTouched(instructionsTouched);
  };

  const updateIngredientHandler = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const validateIngredientHandler = (index) => {
    const newTouched = [...ingredientsTouched];
    newTouched[index] = true;
    setIngredientsTouched(newTouched);

    const newErrors = [...ingredientErrors];
    newErrors[index] = validator.validateIngredient(ingredients[index]);
    setIngredientErrors(newErrors);
  };

  // const deleteIngredientHandler = (index) => {
  //   const newIngredients = [...ingredients];
  //   newIngredients.splice(index, 1);
  //   setIngredients(newIngredients);
  // };

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
      <h2 className="form-title">Добави нова рецепта</h2>
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
              <button
                type="button"
                onClick={() => deleteInstructionHandler(index)}
              >
                X
              </button>
            </div>
          ))}
          <Button
            text=" + инструкция"
            disabled={false}
            onClick={() => addInputHandler("instruction")}
          />
        </div>

        <div className={styles["create-recipe-input-wrapper"]}>
          <h4 className={styles["create-recipe-title"]}>Продукти</h4>
          {ingredients.map((ingredient, index) => (
            <CustomInput
              key={index}
              label={`Продукт ${index + 1}`}
              value={ingredient}
              onChange={(e) => updateIngredientHandler(index, e.target.value)}
              onBlur={() => validateIngredientHandler(index)}
              error={ingredientErrors[index]}
            />
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
