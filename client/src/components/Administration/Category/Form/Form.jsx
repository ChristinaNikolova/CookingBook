import Button from "../../../shared/Button/Button";
import CustomInput from "../../../shared/CustomInput/CustomInput";
import ImagePreview from "../../../shared/ImagePreview/ImagePreview";
import ServerError from "../../../shared/ServerError/ServerError";

export default function FormCategory({
  type,
  title,
  currentImage,
  serverError,
  formRef,
  errors,
  disabled,
  submitHandler,
  fieldHandler,
  backHandler,
}) {
  const getButtons = () => {
    if (type === "create") {
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
        {title}
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
        {type === "create" && currentImage && (
          <CustomInput
            label="Текущо изображение"
            value={currentImage.name}
            disabled
          />
        )}
        {type === "edit" && currentImage && (
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
