import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import useConfigToken from "../../../../hooks/useConfigToken";
import Button from "../../../shared/Button/Button";
import CustomInput from "../../../shared/CustomInput/CustomInput";
import ServerError from "../../../shared/ServerError/ServerError";
import requester from "../../../../utils/helpers/requester";
import { httpMethods } from "../../../../utils/constants/global";

const initialValues = {
  name: "",
  description: "",
  image: "",
};

export default function CreateCategory() {
  const [currentImage, setCurrentImage] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const config = useConfigToken();
  const formRef = useRef();

  const { fieldHandler, submitHandler, errors, disabledForm, files } = useForm(
    createHandler,
    "category",
    initialValues,
    formRef
  );

  async function createHandler(data) {
    setServerError("");
    setCurrentImage("");
    try {
      await requester("/admin/categories", httpMethods.POST, data, config);
      navigate("/admin/category/all");
    } catch (err) {
      setServerError(err.message);
      setCurrentImage(files.image);
    }
  }

  return (
    <section id="admin-create-category" className="section-form">
      {serverError && <ServerError error={serverError} />}
      <h2 ref={formRef} className="form-title">
        Създай нова категория
      </h2>
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
        {currentImage && (
          <CustomInput label="Test" value={currentImage.name} disabled />
        )}
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
