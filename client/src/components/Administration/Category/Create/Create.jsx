import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import useConfigToken from "../../../../hooks/useConfigToken";
import Button from "../../../shared/Button/Button";
import CustomInput from "../../../shared/CustomInput/CustomInput";
import ServerError from "../../../shared/ServerError/ServerError";
import requester from "../../../../utils/requester";
import { httpMethods } from "../../../../utils/constants/global";

const initialValues = {
  name: "",
  description: "",
  image: "",
};

// todo cleanup data.trim() and servererror return catch
export default function CreateCategory() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const config = useConfigToken();

  const { fieldHandler, submitHandler, errors, disabledForm, files } = useForm(
    createHandler,
    "category",
    initialValues
  );

  async function createHandler(data) {
    setServerError("");
    try {
      await requester("/admin/categories", httpMethods.POST, data, config);
      navigate("/admin/category/all");
    } catch (err) {
      setServerError(err.message);
    }
  }

  return (
    <section id="admin-create-category" className="section-form">
      {serverError && <ServerError error={serverError} />}
      <h2 className="form-title">Създай нова категория</h2>
      <form className="form" action={submitHandler}>
        <CustomInput
          label="Име"
          type="text"
          error={errors.name}
          {...fieldHandler("name")}
        />
        <CustomInput
          tag="textarea"
          label="Описание"
          error={errors.description}
          {...fieldHandler("description")}
        />
        <CustomInput
          label="Изображение"
          type="file"
          error={errors.image}
          {...fieldHandler("image")}
        />
        <Button
          text="Създай категория"
          type="submit"
          disabled={disabledForm() || !files.image}
        />
      </form>
    </section>
  );
}
