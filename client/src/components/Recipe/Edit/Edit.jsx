import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useFetch from "../../../hooks/useFetch";
import useAction from "../../../hooks/useAction";
import useDynamicInput from "../../../hooks/useDynamicInput";
import FormRecipe from "../Form/Form";
import Loader from "../../Loader/Loader";
import { validator } from "../../../utils/helpers/validator";
import { image } from "../../../utils/helpers/image";
import {
  httpMethods,
  serverPaths,
  types,
} from "../../../utils/constants/global";

const initialValues = {
  title: "",
  summary: "",
  neededTime: "",
  portions: "",
  category: "",
  image: "",
  isBabySafe: false,
};

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef();

  const [currentImage, setCurrentImage] = useState("");

  const {
    addInputHandler: addInputInstructionsHandler,
    updateHandler: updateInstructionHandler,
    validateHandler: validateInstructionHandler,
    deleteHandler: deleteInstructionHandler,
    values: instructions,
    setValues: setInstructions,
    valuesErrors: instructionErrors,
  } = useDynamicInput("validateInstruction");

  const {
    addInputHandler: addInputIngredientsHandler,
    updateHandler: updateIngredientHandler,
    validateHandler: validateIngredientHandler,
    deleteHandler: deleteIngredientHandler,
    values: ingredients,
    setValues: setIngredients,
    valuesErrors: ingredientErrors,
  } = useDynamicInput("validateIngredient");

  const {
    fieldHandler,
    submitHandler,
    errors,
    disabledForm,
    files,
    setValues,
  } = useForm(editHandler, "recipe", initialValues, formRef);

  const { values: result, loading } = useFetch(
    initialValues,
    `${serverPaths.RECIPES}/${id}`
  );
  const { execute, serverError } = useAction();

  useEffect(() => {
    if (result.title) {
      setValues({
        title: result.title,
        summary: result.summary,
        neededTime: result.neededTime,
        portions: result.portions,
        category: result.category._id,
        image: result.image,
        isBabySafe: result.isBabySafe,
      });
      setCurrentImage(image.getImageUrl(result.image));
      setInstructions(result.instructions.map((x) => x.description));
      setIngredients(result.ingredients.map((x) => x.description));
    }
  }, [result, setIngredients, setInstructions, setValues]);

  async function editHandler(data) {
    let formData = data;

    if (!(data instanceof FormData)) {
      formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    formData.append(
      "instructions",
      JSON.stringify(instructions.filter((x) => x.trim()))
    );
    formData.append(
      "ingredients",
      JSON.stringify(ingredients.filter((x) => x.trim()))
    );

    if (!files.image) {
      delete formData.image;
    }

    try {
      await execute(`${serverPaths.RECIPES}/${id}`, httpMethods.PUT, formData);
      navigate(`/recipe/${id}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  const isFormValid = () => {
    const hasInstructionErrors = areErrors(instructions, "validateInstruction");
    const hasIngredientErrors = areErrors(ingredients, "validateIngredient");

    return !disabledForm() && !hasInstructionErrors && !hasIngredientErrors;
  };

  const areErrors = (input, validatorFunc) => {
    return input.some((x) => validator[validatorFunc](x));
  };

  const backHandler = () => {
    navigate(`/recipe/${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <FormRecipe
      type={types.EDIT}
      instructions={instructions}
      ingredients={ingredients}
      currentImage={currentImage}
      serverError={serverError}
      formRef={formRef}
      errors={errors}
      disabled={!isFormValid()}
      submitHandler={submitHandler}
      fieldHandler={fieldHandler}
      backHandler={backHandler}
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
