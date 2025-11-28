import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";

const initialValue = {
  email: "",
  password: "",
};

export default function Login() {
  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    loginHandler,
    "login",
    initialValue
  );

  async function loginHandler({ email, password }) {
    // todo add validations
    console.log(email);
    console.log(password);
  }

  return (
    <section id="login" className="section">
      <h2 className="login-title">Влез в профила</h2>
      <form className="login-form" action={submitHandler}>
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
        <Button text="Вписване" disabled={disabledForm()} />
      </form>
    </section>
  );
}
