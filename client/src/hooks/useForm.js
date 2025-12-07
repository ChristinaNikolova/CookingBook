import { useEffect, useState } from "react";
import { validator } from "../utils/helpers/validator";
import { formHelpers } from "../utils/helpers/form";

export default function useForm(
  callback,
  validatorName,
  initialValues,
  formRef = false
) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState({});

  useEffect(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [formRef]);

  const fieldHandler = (fieldName) => {
    return {
      name: fieldName,
      value: values[fieldName],
      onChange: changeHandler,
      onBlur: validateHandler,
    };
  };

  const changeHandler = (e) => {
    const { name, type, checked, value, files: inputFiles } = e.target;

    switch (type) {
      case "file": {
        const file = inputFiles?.[0];
        setFiles((state) => ({ ...state, [name]: file }));
        setValues((state) => ({ ...state, [name]: file?.name || "" }));
        break;
      }
      case "checkbox":
        setValues((state) => ({ ...state, [name]: checked }));
        break;
      default:
        setValues((state) => ({ ...state, [name]: value }));
    }
  };

  // todo remove this after all form are ready and tested
  const wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Wait is over!");
      }, time);
    });
  };

  const submitHandler = async () => {
    await wait(2000);
    const data = formHelpers.prepareData(values, files);
    callback(data);
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

  const disabledForm = () => {
    return (
      Object.values(values).some((x) => typeof x === "string" && !x) ||
      Object.keys(errors).length
    );
  };

  return {
    submitHandler,
    fieldHandler,
    errors,
    disabledForm,
    files,
    values,
    setValues,
  };
}
