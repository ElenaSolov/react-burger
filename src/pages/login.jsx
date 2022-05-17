import React from "react";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyles from "./login.module.css";
import { Link } from "react-router-dom";

export function LoginPage() {
  const [emailValue, setEmail] = React.useState("");
  const [passwordValue, setPassword] = React.useState("");
  const onChange = (e) => {
    console.log(e.target);
    if (e.target.type === "password") {
      setPassword(e.target.value);
    } else {
      setEmail(e.target.value);
    }
  };

  return (
    <section className={loginStyles.login}>
      <div className={loginStyles.container}>
        <h2 className={`${loginStyles.title} text text_type_main-large`}>
          Вход
        </h2>
        <form className={loginStyles.form}>
          <div className={`${loginStyles.input} mt-6`}>
            <EmailInput
              onChange={onChange}
              value={emailValue}
              name={"email"}
              placeholder="E-mail"
            />
          </div>
          <div className={`${loginStyles.input} mt-6 mb-6`}>
            <Input
              type="password"
              onChange={onChange}
              value={passwordValue}
              placeholder="Пароль"
            />
          </div>
          <Button type="primary" size="medium" onClick={() => {}}>
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вы — новый пользователь?
          <Link to="/registration" className={loginStyles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link to="/" className={loginStyles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </section>
  );
}
