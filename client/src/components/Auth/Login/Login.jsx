import useForm from "../../../hooks/useForm";
import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    loginHandler,
    "login",
    initialValues
  );

  async function loginHandler({ email, password }) {
    // todo add validations
    // todo disabled button during fetch
    console.log(email);
    console.log(password);
  }

  return (
    <section id="login" className="section-form">
      <h2 className="form-title">Вход</h2>
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
        <Button text="Вход" disabled={disabledForm()} />
      </form>
    </section>
  );
}
