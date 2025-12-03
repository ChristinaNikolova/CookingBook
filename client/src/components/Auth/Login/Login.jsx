import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useAuthContext from "../../../hooks/useAuthContext";
import CustomInput from "../../shared/CustomInput/CustomInput";
import Button from "../../shared/Button/Button";
import ServerError from "../../shared/ServerError/ServerError";
import requester from "../../../utils/requester";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    loginHandler,
    "login",
    initialValues
  );

  async function loginHandler({ email, password }) {
    const data = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const result = await requester("/auth/login", "post", data);
      console.log(result);
      userAuth(result);
      navigate("/");
    } catch (err) {
      setServerError(err.message);
      return;
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
