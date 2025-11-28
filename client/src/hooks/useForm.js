import { useState } from "react";
import { validator } from "../utils/validator";

// todo add constant for the error messages
export default function useForm(callback, validatorName, initialValues) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const fieldHandler = (fieldName) => {
    return {
      name: fieldName,
      value: values[fieldName],
      onChange: changeHandler,
      onBlur: validateHandler,
    };
  };

  const changeHandler = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const submitHandler = () => {
    callback(values);
  };

  const validateHandler = (e) => {
    const newTouched = {
      ...touched,
      [e.target.name]: true,
    };
    setTouched(newTouched);

    const errors = validator[validatorName](values, newTouched);
    setErrors(errors);
  };

  return {
    submitHandler,
    fieldHandler,
    errors,
  };
}
