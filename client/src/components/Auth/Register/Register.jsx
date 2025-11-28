import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";

export default function Register() {
  const { fieldHandler, submitHandler } = useForm(registerHandler, {
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
          {...fieldHandler("email")}
          // onBlur={blurHandler}
        />
        <CustomInput
          label="Парола"
          {...fieldHandler("password")}
          // onBlur={blurHandler}
        />
        <CustomInput
          label="Повтори парола"
          {...fieldHandler("rePass")}
          // onBlur={blurHandler}
        />
        <Button text="Регистрация" />
      </form>
    </section>
  );
}
