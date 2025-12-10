import { useRef } from "react";
import useForm from "../../../hooks/useForm";
import useAction from "../../../hooks/useAction";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";
import ServerError from "../../shared/ServerError/ServerError";
import { httpMethods, serverPaths } from "../../../utils/constants/global";

const initialValues = {
  description: "",
};

export default function CreateNote({ onCreate }) {
  const formRef = useRef();

  const { execute, serverError } = useAction();
  const { fieldHandler, submitHandler, errors, disabledForm, setValues } =
    useForm(createHandler, "note", initialValues, formRef);

  async function createHandler(data) {
    try {
      const result = await execute(serverPaths.NOTES, httpMethods.POST, data);
      setValues(initialValues);
      onCreate(result);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="section-form">
      {serverError && <ServerError error={serverError} />}
      <h2 ref={formRef} className="form-title">
        Добави бележка
      </h2>
      <form className="form" action={submitHandler}>
        <CustomInput
          tag="textarea"
          label="Описание"
          rows={5}
          error={errors.description}
          {...fieldHandler("description")}
        />
        <Button text="Добави бележка" type="submit" disabled={disabledForm()} />
      </form>
    </section>
  );
}
