import { getTranslations } from "../../../../utils/i18n";
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
  const t = getTranslations();
  
  const getTitle = () => {
    return type === types.CREATE
      ? t.createNewCategory
      : t.editCategory;
  };

  const getButtons = () => {
    if (type === types.CREATE) {
      return (
        <Button text={t.createCategory} type="submit" disabled={disabled} />
      );
    }

    return (
      <div className="form-btns-wrapper">
        <Button text={t.saveChanges} type="submit" disabled={disabled} />
        <Button
          text={t.close}
          type="button"
          disabled={false}
          onClick={backHandler}
        />
      </div>
    );
  };

  return (
    <section id="admin-form-category" className="section-form">
      {serverError.message && (
        <ServerError error={serverError.message} key={serverError.time} />
      )}
      <h2 ref={formRef} className="form-title">
        {getTitle()}
      </h2>
      <form className="form" action={submitHandler}>
        <CustomInput
          label={t.name}
          error={errors.name}
          {...fieldHandler("name")}
        />
        <CustomInput
          tag="textarea"
          label={t.description}
          error={errors.description}
          {...fieldHandler("description")}
        />
        {type === types.CREATE && currentImage && (
          <CustomInput
            label={t.currentImage}
            value={currentImage.name}
            disabled
          />
        )}
        {type === types.EDIT && currentImage && (
          <ImagePreview name={t.currentImage} currentImage={currentImage} />
        )}
        <CustomInput
          label={t.image}
          type="file"
          error={errors.image}
          {...fieldHandler("image")}
        />
        {getButtons()}
      </form>
    </section>
  );
}
