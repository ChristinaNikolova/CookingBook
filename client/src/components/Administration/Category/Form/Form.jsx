import Button from "../../../shared/Button/Button";
import CustomInput from "../../../shared/CustomInput/CustomInput";
import ImagePreview from "../../../shared/ImagePreview/ImagePreview";
import ServerError from "../../../shared/ServerError/ServerError";
import { types } from "../../../../utils/constants/global";

export default function FormCategory({
  type,
  currentImage,
  serverError,
  formRef,
  errors,
  disabled,
  submitHandler,
  fieldHandler,
  backHandler,
}) {
  const getTitle = () => {
    return type === types.CREATE
      ? "Създай нова категория"
      : "Редактирай категория";
  };

  const getButtons = () => {
    if (type === types.CREATE) {
      return (
        <Button text="Създай категория" type="submit" disabled={disabled} />
      );
    }

    return (
      <div className="form-btns-wrapper">
        <Button text="Запази промените" type="submit" disabled={disabled} />
        <Button
          text="Затвори"
          type="button"
          disabled={false}
          onClick={backHandler}
        />
      </div>
    );
  };

  return (
    <section id="admin-form-category" className="section-form">
      {serverError && <ServerError error={serverError} />}
      <h2 ref={formRef} className="form-title">
        {getTitle()}
      </h2>
      <form className="form" action={submitHandler}>
        <CustomInput
          label="Име"
          error={errors.name}
          {...fieldHandler("name")}
        />
        <CustomInput
          tag="textarea"
          label="Описание"
          error={errors.description}
          {...fieldHandler("description")}
        />
        {type === types.CREATE && currentImage && (
          <CustomInput
            label="Текущо изображение"
            value={currentImage.name}
            disabled
          />
        )}
        {type === types.EDIT && currentImage && (
          <ImagePreview name="Текущо изображение" currentImage={currentImage} />
        )}
        <CustomInput
          label="Изображение"
          type="file"
          error={errors.image}
          {...fieldHandler("image")}
        />
        {getButtons()}
      </form>
    </section>
  );
}
