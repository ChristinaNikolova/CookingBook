import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useConfigToken from "../../../hooks/useConfigToken";
import FormRecipe from "../Form/Form";
import { validator } from "../../../utils/helpers/validator";
import requester from "../../../utils/helpers/requester";
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
    setValues,
  } = useForm(editHandler, "recipe", initialValues, formRef);

  useEffect(() => {
    requester(`${serverPaths.RECIPES}/${id}`, httpMethods.GET, null, config)
      .then((res) => {
        setValues({
          title: res.title,
          summary: res.summary,
          neededTime: res.neededTime,
          portions: res.portions,
          category: res.category._id,
          image: res.image,
          isBabySafe: res.isBabySafe,
        });
        setCurrentImage(image.getImageUrl(res.image));
        setInstructions(res.instructions.map((x) => x.description));
        setIngredients(res.ingredients.map((x) => x.description));
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [config, id, setValues]);

  async function editHandler(data) {
    setServerError("");
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
      await requester(
        `${serverPaths.RECIPES}/${id}`,
        httpMethods.PUT,
        formData,
        config
      );
      navigate(`/recipe/${id}`);
    } catch (err) {
      setServerError(err.message);
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

    return !disabledForm() && !hasInstructionErrors && !hasIngredientErrors;
  };

  const areErrors = (input, validatorFunc) => {
    return input.some((x) => validator[validatorFunc](x));
  };

  const backHandler = () => {
    navigate(`/recipe/${id}`);
  };

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
