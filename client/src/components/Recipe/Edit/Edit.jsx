import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useFetch from "../../../hooks/useFetch";
import useAction from "../../../hooks/useAction";
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
  const [currentImage, setCurrentImage] = useState("");
  const [instructions, setInstructions] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [instructionErrors, setInstructionErrors] = useState([]);
  const [ingredientErrors, setIngredientErrors] = useState([]);
  const [instructionsTouched, setInstructionsTouched] = useState([]);
  const [ingredientsTouched, setIngredientsTouched] = useState([]);

  const navigate = useNavigate();
  const formRef = useRef();

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
  }, [setValues, result]);

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

  // todo fix useform ref
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
