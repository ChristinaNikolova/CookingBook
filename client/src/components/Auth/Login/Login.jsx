import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useAuthContext from "../../../hooks/useAuthContext";
import CustomInput from "../../shared/CustomInput/CustomInput";
import Button from "../../shared/Button/Button";
import ServerError from "../../shared/ServerError/ServerError";
import requester from "../../../utils/helpers/requester";
import { httpMethods, serverPaths } from "../../../utils/constants/global";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { userAuth } = useAuthContext();

  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    loginHandler,
    "login",
    initialValues
  );

  async function loginHandler(data) {
    setServerError("");
    try {
      const result = await requester(serverPaths.LOGIN, httpMethods.POST, data);
      userAuth(result);
      navigate("/");
    } catch (err) {
      setServerError(err.message);
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
