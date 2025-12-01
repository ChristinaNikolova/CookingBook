import useForm from "../../../../hooks/useForm";
import Button from "../../../shared/Button/Button";
import CustomInput from "../../../shared/CustomInput/CustomInput";

const initialValues = {
  name: "",
  image: "",
};
export default function CreateCategory() {
  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    createHandler,
    "category",
    initialValues
  );

  async function createHandler({ name, image }) {
    // todo add category summary
    // todo add validations
    // todo disabled button during fetch
    // todo trim data
    console.log(name);
    console.log(image);
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
          label="Изображение"
          type="file"
          error={errors.image}
          {...fieldHandler("image")}
        />
        <Button text="Създай" type="submit" disabled={disabledForm()} />
      </form>
    </section>
  );
}
