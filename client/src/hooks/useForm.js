import { useState } from "react";

export default function useForm(callback, initialValues) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

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

  const fieldHandler = (fieldName) => {
    return {
      name: fieldName,
      value: values[fieldName],
      onChange: changeHandler,
      onBlur: validateHandler,
    };
  };

  const validateHandler = (e) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));

    const errors = validate();
    setErrors(errors);
    console.log(errors);
  };

  const validate = () => {
    const errors = {};

    if (!values.email && touched.email) {
      errors["email"] = "Полето е задължително";
    }

    const emailRegex = new RegExp(
      "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
    );

    if (values.email && !emailRegex.test(values.email) && touched.email) {
      errors["email"] = "Невалиден имейл адрес";
    }

    if (!values.password && touched.password) {
      errors["password"] = "Полето е задължително";
    }

    if (
      (values.password && values.password.length < 6) ||
      (values.password.length > 50 && touched.password)
    ) {
      errors["password"] = "Паролата трябва да е между 6 и 50 символа";
    }

    if (
      values.password !== values.rePass &&
      touched.password &&
      touched.rePass
    ) {
      errors["password"] = "Двете пароли не са еднакви";
      errors["rePass"] = "Двете пароли не са еднакви";
    }

    return errors;
  };

  return {
    submitHandler,
    fieldHandler,
    errors,
  };
}
