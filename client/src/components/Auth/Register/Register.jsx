import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useAuthContext from "../../../hooks/useAuthContext";
import CustomInput from "../../shared/CustomInput/CustomInput";
import Button from "../../shared/Button/Button";
import ServerError from "../../shared/ServerError/ServerError";

const initialValues = {
  email: "",
  password: "",
  rePass: "",
};

export default function Register() {
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const { fieldHandler, submitHandler, errors, disabledForm } = useForm(
    registerHandler,
    "register",
    initialValues
  );

  function registerHandler({ email, password }) {
    const data = {
      email: email.trim(),
      password: password.trim(),
    };

    setServerError(false);
    // todo check why : data.message[0].msg
    fetch("http://localhost:3030/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.accessToken) {
          setServerError(data.message[0].msg);
          return;
        }

        userAuth(data);
        navigate("/");
      })
      .catch((err) => console.error(err));
  }

  return (
    <section id="register" className="section-form">
      {serverError && <ServerError error={serverError} />}
      <h2 className="form-title">Регистрация</h2>
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
        <CustomInput
          label="Повтори парола"
          type="password"
          error={errors.rePass}
          {...fieldHandler("rePass")}
        />
        <Button text="Регистрация" type="submit" disabled={disabledForm()} />
      </form>
    </section>
  );
}
