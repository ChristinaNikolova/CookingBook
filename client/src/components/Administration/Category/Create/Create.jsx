import useForm from "../../../../hooks/useForm";
import Button from "../../../shared/Button/Button";
import CustomInput from "../../../shared/CustomInput/CustomInput";

const initialValues = {
  name: "",
  description: "",
  image: "",
};
export default function CreateCategory() {
  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    createHandler,
    "category",
    initialValues
  );

  async function createHandler({ name, description, image }) {
    const data = {
      name: name.trim(),
      description: description.trim(),
      image: image.trim(),
    };
    console.log(data);
  }

  return (
    <section id="admin-create-category" className="section-form">
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
          disabled={disabledForm()}
        />
      </form>
    </section>
  );
}
