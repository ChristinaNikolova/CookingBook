import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import useConfigToken from "../../../../hooks/useConfigToken";
import Button from "../../../shared/Button/Button";
import CustomInput from "../../../shared/CustomInput/CustomInput";
import ServerError from "../../../shared/ServerError/ServerError";
import ImagePreview from "../../../shared/ImagePreview/ImagePreview";
import requester from "../../../../utils/helpers/requester";
import { image } from "../../../../utils/helpers/image";
import { httpMethods } from "../../../../utils/constants/global";

const initialValues = {
  name: "",
  description: "",
  image: "",
};

export default function EditCategory() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const config = useConfigToken();
  const formRef = useRef();

  const {
    fieldHandler,
    submitHandler,
    errors,
    disabledForm,
    files,
    setValues,
  } = useForm(editHandler, "category", initialValues, formRef);

  useEffect(() => {
    requester(`/admin/categories/${id}`, httpMethods.GET, null, config)
      .then((res) => {
        setValues(res);
        setCurrentImage(image.getImageUrl(res.image));
      })
      .catch((err) => console.error(err));
  }, [config, id, setValues]);

  async function editHandler(data) {
    setServerError("");
    try {
      if (!files.image) {
        delete data.image;
      }
      await requester(`/admin/categories/${id}`, httpMethods.PUT, data, config);
      navigate("/admin/category/all");
    } catch (err) {
      setServerError(err.message);
    }
  }

  const backHandler = () => {
    navigate("/admin/category/all");
  };

  return (
    <section id="admin-edit-category" className="section-form">
      {serverError && <ServerError error={serverError} />}
      <h2 ref={formRef} className="form-title">
        Редактирай категория
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
          <ImagePreview name="Текуща картинка" currentImage={currentImage} />
        )}
        <CustomInput
          label="Избери ново изображение"
          type="file"
          error={errors.image}
          {...fieldHandler("image")}
        />
        <div className="form-btns-wrapper">
          <Button
            text="Запази промените"
            type="submit"
            disabled={disabledForm()}
          />
          <Button
            text="Затвори"
            type="button"
            disabled={false}
            onClick={backHandler}
          />
        </div>
      </form>
    </section>
  );
}
