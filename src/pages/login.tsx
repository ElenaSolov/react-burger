import React from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import { Link } from "react-router-dom";
import { login } from "../services/actions/authActions";
import { useDispatch } from "react-redux";
import { onInputChange } from "../utils/utils";

function LoginPage(): JSX.Element {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(login(emailValue, passwordValue));
  };

  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Вход
        </h2>
        <form onSubmit={onSubmit} className={pagesStyles.form}>
          <div className={`${pagesStyles.input} mt-6`}>
            <EmailInput
              name="email"
              value={emailValue}
              onChange={(e) => onInputChange(e, setEmailValue)}
            />
          </div>
          <div className={`${pagesStyles.input} mt-6`}>
            <PasswordInput
              name="password"
              value={passwordValue}
              onChange={(e) => onInputChange(e, setPasswordValue)}
            />
          </div>
          <div className="mt-6">
            <Button type="primary" size="medium">
              Войти
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вы — новый пользователь?
          <Link to="/register" className={pagesStyles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль?
          <Link to="/forgot-password" className={pagesStyles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
