import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";

const initialValues = {
  description: "",
};

export default function CreateNote() {
  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    createHandler,
    "note",
    initialValues
  );

  async function createHandler({ description }) {
    // todo add note for DB
    // todo add validations
    // todo trim data
    console.log(description);
  }

  return (
    <section className="section-form">
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
