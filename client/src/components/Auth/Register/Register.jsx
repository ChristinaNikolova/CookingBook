import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";

export default function Register() {
  const { fieldHandler, submitHandler, errors } = useForm(registerHandler, {
    email: "",
    password: "",
    rePass: "",
  });

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
          {...fieldHandler("email")}
          error={errors.email}
        />

        <CustomInput
          label="Парола"
          type="password"
          {...fieldHandler("password")}
          error={errors.password}
        />

        <CustomInput
          label="Повтори парола"
          type="password"
          {...fieldHandler("rePass")}
          error={errors.rePass}
        />
        <Button text="Регистрация" />
      </form>
    </section>
  );
}
