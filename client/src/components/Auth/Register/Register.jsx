import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useAction from "../../../hooks/useAction";
import useAuthContext from "../../../hooks/useAuthContext";
import { getTranslations } from "../../../utils/i18n";
import CustomInput from "../../shared/CustomInput/CustomInput";
import Button from "../../shared/Button/Button";
import ServerError from "../../shared/ServerError/ServerError";
import { httpMethods, serverPaths } from "../../../utils/constants/global";

const initialValues = {
  email: "",
  password: "",
  rePass: "",
};

export default function Register() {
  const navigate = useNavigate();
  const { userAuth } = useAuthContext();
  const t = getTranslations();

  const { execute, serverError } = useAction();
  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    registerHandler,
    "register",
    initialValues
  );

  async function registerHandler(data) {
    try {
      const result = await execute(
        serverPaths.REGISTER,
        httpMethods.POST,
        data
      );
      userAuth(result);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <section id="register" className="section-form">
      {serverError.message && (
        <ServerError error={serverError.message} key={serverError.time} />
      )}
      <h2 className="form-title">{t.register}</h2>
      <form className="form" action={submitHandler}>
        <CustomInput
          label={t.email}
          type="email"
          error={errors.email}
          {...fieldHandler("email")}
        />
        <CustomInput
          label={t.password}
          type="password"
          error={errors.password}
          {...fieldHandler("password")}
        />
        <CustomInput
          label={t.repeatPassword}
          type="password"
          error={errors.rePass}
          {...fieldHandler("rePass")}
        />
        <Button text={t.register} type="submit" disabled={disabledForm()} />
      </form>
    </section>
  );
}
