// todo адд categorydrop down

import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";

const initialValues = {
  title: "",
  summary: "",
  neededTime: "",
  portions: "",
  instruction: "",
  ingredient: "",
  image: "",
  isBabySafe: false,
};
export default function Create() {
  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    createHandler,
    "recipe",
    initialValues
  );

  async function createHandler({
    title,
    summary,
    neededTime,
    portions,
    instruction,
    ingredient,
    image,
    isBabySafe,
  }) {
    // todo add validations
    console.log(title);
    console.log(summary);
    console.log(neededTime);
    console.log(portions);
    console.log(instruction);
    console.log(ingredient);
    console.log(image);
    console.log(isBabySafe);
  }

  return (
    <section id="create-recipe" className="section">
      <h2 className="create-recipe-title">Добави нова рецепта</h2>
      <form className="create-recipe-form" action={submitHandler}>
        <CustomInput
          label="Заглавие"
          error={errors.title}
          {...fieldHandler("title")}
        />
        <CustomInput
          tag="textarea"
          label="Резюме"
          error={errors.summary}
          {...fieldHandler("summary")}
        />
        <CustomInput
          label="Необходимо време"
          error={errors.neededTime}
          {...fieldHandler("neededTime")}
        />
        <CustomInput
          label="Брой порции"
          type="number"
          error={errors.portions}
          {...fieldHandler("portions")}
        />
        <CustomInput
          label="Инструкции"
          error={errors.instruction}
          {...fieldHandler("instruction")}
        />
        <CustomInput
          label="Необходими продукти"
          error={errors.ingredient}
          {...fieldHandler("ingredient")}
        />
        <CustomInput
          label="Качи снимка"
          type="file"
          error={errors.image}
          {...fieldHandler("image")}
        />
        <CustomInput
          label="Подходящо за бебе"
          type="checkbox"
          error={errors.isBabySafe}
          {...fieldHandler("isBabySafe")}
        />
        <Button text="Създай рецепта" disabled={disabledForm()} />
      </form>
    </section>
  );
}
