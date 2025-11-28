import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";

// todo disabled button during fetch
const initialValue = {
  email: "",
  password: "",
  rePass: "",
};

export default function Register() {
  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    registerHandler,
    "register",
    initialValue
  );

  async function registerHandler({ email, password, rePass }) {
    // todo add validations
    console.log(email);
    console.log(password);
    console.log(rePass);
  }

  return (
    <section id="register" className="section">
      <h2 className="register-title">Регистирай се</h2>
      <form className="register-form" action={submitHandler}>
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
