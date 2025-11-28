import { useState } from "react";

export default function useForm(callback, initialValues) {
  const [values, setValues] = useState(initialValues);

  const changeHandler = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const submitHandler = (formData) => {
    console.log("in", formData);
    callback(values);
  };

  const fieldHandler = (fieldName) => {
    console.log(fieldName);
    return {
      name: fieldName,
      value: values[fieldName],
      onChange: changeHandler,
    };
  };

  return {
    submitHandler,
    fieldHandler,
  };
}
