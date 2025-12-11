import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useAction from "../../../hooks/useAction";
import useDynamicInput from "../../../hooks/useDynamicInput";
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

export default function CreateRecipe() {
  const navigate = useNavigate();
  const formRef = useRef();

  const [currentImage, setCurrentImage] = useState("");

  const {
    addInputHandler: addInputInstructionsHandler,
    updateHandler: updateInstructionHandler,
    validateHandler: validateInstructionHandler,
    deleteHandler: deleteInstructionHandler,
    values: instructions,
    valuesErrors: instructionErrors,
  } = useDynamicInput("validateInstruction");

  const {
    addInputHandler: addInputIngredientsHandler,
    updateHandler: updateIngredientHandler,
    validateHandler: validateIngredientHandler,
    deleteHandler: deleteIngredientHandler,
    values: ingredients,
    valuesErrors: ingredientErrors,
  } = useDynamicInput("validateIngredient");

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
      addInputHandlerIngredients={addInputIngredientsHandler}
      addInputHandlerInstructions={addInputInstructionsHandler}
      updateInstructionHandler={updateInstructionHandler}
      validateInstructionHandler={validateInstructionHandler}
      deleteInstructionHandler={deleteInstructionHandler}
      updateIngredientHandler={updateIngredientHandler}
      validateIngredientHandler={validateIngredientHandler}
      deleteIngredientHandler={deleteIngredientHandler}
    />
  );
}
