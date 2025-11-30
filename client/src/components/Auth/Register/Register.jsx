import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";

const initialValues = {
  email: "",
  password: "",
  rePass: "",
};

export default function Register() {
  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    registerHandler,
    "register",
    initialValues
  );

  async function registerHandler({ email, password, rePass }) {
    // todo add validations
    // todo disabled button during fetch
    // todo trim data
    console.log(email);
    console.log(password);
    console.log(rePass);
  }

  return (
    <section id="register" className="section-form">
      <h2 className="form-title">Регистрация</h2>
      <form className="form" action={submitHandler}>
        <CustomInput
          label="Имейл"
          type="email"
          error={errors.email}
          {...fieldHandler("email")}
        />
        <CustomInput
          label="Парола"
          type="password"
          error={errors.password}
          {...fieldHandler("password")}
        />
        <CustomInput
          label="Повтори парола"
          type="password"
          error={errors.rePass}
          {...fieldHandler("rePass")}
        />
        <Button text="Регистрация" disabled={disabledForm()} />
      </form>
    </section>
  );
}
