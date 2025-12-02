import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useAuthContext from "../../../hooks/useAuthContext";
import CustomInput from "../../shared/CustomInput/CustomInput";
import Button from "../../shared/Button/Button";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();
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

    fetch("http://localhost:3030/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.accessToken) {
          // todo add component for server errors
          return;
        }

        userAuth(data);
        navigate("/");
      })
      .catch((err) => console.error(err));
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
        <Button text="Вход" type="submit" disabled={disabledForm()} />
      </form>
    </section>
  );
}
