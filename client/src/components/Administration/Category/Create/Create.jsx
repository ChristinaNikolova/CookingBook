import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import useConfigToken from "../../../../hooks/useConfigToken";
import Button from "../../../shared/Button/Button";
import CustomInput from "../../../shared/CustomInput/CustomInput";
import ServerError from "../../../shared/ServerError/ServerError";
import requester from "../../../../utils/requester";

const initialValues = {
  name: "",
  description: "",
  image: "",
};
export default function CreateCategory() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const config = useConfigToken();

  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    createHandler,
    "category",
    initialValues
  );

  async function createHandler({ name, description, image }) {
    setServerError("");
    const data = {
      name: name.trim(),
      description: description.trim(),
      image: image.trim(),
    };

    try {
      await requester("/admin/categories", "post", data, config);
      navigate("/admin/category/all");
    } catch (err) {
      setServerError(err.message);
      return;
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
          type="text"
          error={errors.image}
          {...fieldHandler("image")}
        />
        <Button
          text="Създай категория"
          type="submit"
          disabled={disabledForm()}
        />
      </form>
    </section>
  );
}
