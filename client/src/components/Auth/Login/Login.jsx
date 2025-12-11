import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useAction from "../../../hooks/useAction";
import useAuthContext from "../../../hooks/useAuthContext";
import CustomInput from "../../shared/CustomInput/CustomInput";
import Button from "../../shared/Button/Button";
import ServerError from "../../shared/ServerError/ServerError";
import { httpMethods, serverPaths } from "../../../utils/constants/global";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const { userAuth } = useAuthContext();

  const { execute, serverError } = useAction();
  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    loginHandler,
    "login",
    initialValues
  );

  async function loginHandler(data) {
    try {
      const result = await execute(serverPaths.LOGIN, httpMethods.POST, data);
      userAuth(result);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <section id="login" className="section-form">
      {serverError && <ServerError error={serverError} />}
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
        <Button text="Вход" type="submit" disabled={disabledForm()} />
      </form>
    </section>
  );
}
