import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useAction from "../../../hooks/useAction";
import FormRecipe from "../Form/Form";
import { validator } from "../../../utils/helpers/validator";
import {
  httpMethods,
  ids,
  serverPaths,
  types,
} from "../../../utils/constants/global";

const initialValues = {
  title: "",
  summary: "",
  neededTime: "",
  portions: "",
  category: ids.DEFAULT_CATEGORY_ID,
  image: "",
  isBabySafe: false,
};
// todo checkbox problem again !!!
export default function CreateRecipe() {
  const [currentImage, setCurrentImage] = useState("");
  const [instructions, setInstructions] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [instructionErrors, setInstructionErrors] = useState([]);
  const [ingredientErrors, setIngredientErrors] = useState([]);
  const [instructionsTouched, setInstructionsTouched] = useState([]);
  const [ingredientsTouched, setIngredientsTouched] = useState([]);

  const navigate = useNavigate();
  const formRef = useRef();

  const { fieldHandler, submitHandler, errors, disabledForm, files, values } =
    useForm(createHandler, "recipe", initialValues, formRef);

  const { execute, serverError } = useAction();

  async function createHandler(data) {
    setCurrentImage("");

    data.append(
      "instructions",
      JSON.stringify(instructions.filter((i) => i.trim()))
    );
    data.append(
      "ingredients",
      JSON.stringify(ingredients.filter((i) => i.trim()))
    );

    try {
      const result = await execute(serverPaths.RECIPES, httpMethods.POST, data);
      navigate(`/recipe/${result.id}`);
    } catch (err) {
      console.error(err.message);
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

  // todo extract same logic
  return (
    <FormRecipe
      type={types.CREATE}
      instructions={instructions}
      ingredients={ingredients}
      currentImage={currentImage}
      serverError={serverError}
      formRef={formRef}
      errors={errors}
      disabled={!isFormValid()}
      submitHandler={submitHandler}
      fieldHandler={fieldHandler}
      instructionErrors={instructionErrors}
      ingredientErrors={ingredientErrors}
      addInputHandler={addInputHandler}
      updateInstructionHandler={updateInstructionHandler}
      validateInstructionHandler={validateInstructionHandler}
      deleteInstructionHandler={deleteInstructionHandler}
      updateIngredientHandler={updateIngredientHandler}
      validateIngredientHandler={validateIngredientHandler}
      deleteIngredientHandler={deleteIngredientHandler}
    />
  );
}
