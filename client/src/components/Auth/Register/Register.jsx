import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";

export default function Register() {
  const { fieldHandler, submitHandler, errors } = useForm(
    registerHandler,
    "register",
    {
      email: "",
      password: "",
      rePass: "",
    }
  );

  async function registerHandler({ email, password, rePass }) {
    console.log(email);
    console.log(password);
    console.log(rePass);
  }

  return (
    <section id="register" className="section">
      <h2 className="register-title">Регистация</h2>
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
        <Button text="Регистрация" />
      </form>
    </section>
  );
}
