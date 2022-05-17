import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyles from "./login.module.css";
import InputEl from "../components/inputEl/InputEl";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <section className={loginStyles.login}>
      <div className={loginStyles.container}>
        <h2 className={`${loginStyles.title} text text_type_main-large`}>
          Вход
        </h2>
        <form className={loginStyles.form}>
          <InputEl type="email" placeholder="E-mail" />
          <InputEl type="password" placeholder="Пароль" />
          <Button type="primary" size="medium" onClick={() => {}}>
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вы — новый пользователь?
          <Link to="/register" className={loginStyles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль?
          <Link to="/" className={loginStyles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </section>
  );
}
