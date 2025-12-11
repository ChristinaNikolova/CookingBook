import { useState } from "react";
import { validator } from "../utils/helpers/validator";

export default function useDynamicInput(validateInstruction) {
  const [values, setValues] = useState([""]);
  const [valuesErrors, setValuesErrors] = useState([]);
  const [valuesTouched, setValuesTouched] = useState([]);

  const addInputHandler = () => {
    setValues([...values, ""]);
  };

  const updateHandler = (index, value) => {
    updateStateHandler(index, value, values, setValues);
  };

  const validateHandler = (index) => {
    updateStateHandler(index, true, valuesTouched, setValuesTouched);

    const error = validator[validateInstruction](values[index]);
    updateStateHandler(index, error, valuesErrors, setValuesErrors);
  };

  const deleteHandler = (index) => {
    deleteStateHandler(index, values, setValues);
    deleteStateHandler(index, valuesErrors, setValuesErrors);
    deleteStateHandler(index, valuesTouched, setValuesTouched);
  };

  const updateStateHandler = (index, newValue, oldValues, setFunc) => {
    const newValues = [...oldValues];
    newValues[index] = newValue;
    setFunc(newValues);
  };

  const deleteStateHandler = (index, values, setValues) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
  };

  return {
    values,
    setValues,
    valuesErrors,
    addInputHandler,
    updateHandler,
    validateHandler,
    deleteHandler,
  };
}
