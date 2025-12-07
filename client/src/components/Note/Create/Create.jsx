import { useState } from "react";
import useForm from "../../../hooks/useForm";
import useConfigToken from "../../../hooks/useConfigToken";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";
import ServerError from "../../shared/ServerError/ServerError";
import requester from "../../../utils/helpers/requester";
import { httpMethods } from "../../../utils/constants/global";

const initialValues = {
  description: "",
};

export default function CreateNote() {
  const [serverError, setServerError] = useState("");
  const config = useConfigToken();

  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    createHandler,
    "note",
    initialValues
  );

  async function createHandler(data) {
    setServerError("");
    try {
      const result = await requester("/notes", httpMethods.POST, data, config);
      console.log(result);
    } catch (err) {
      setServerError(err.message);
    }
  }

  return (
    <section className="section-form">
      {serverError && <ServerError error={serverError} />}
      <h2 className="form-title">Добави бележка</h2>
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
