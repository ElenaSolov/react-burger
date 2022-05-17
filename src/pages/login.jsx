import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Вход
        </h2>
        <form className={pagesStyles.form}>
          <InputEl type="email" />
          <InputEl type="password" placeholder="Пароль" />
          <div className="mt-6">
            <Button type="primary" size="medium" onClick={() => {}}>
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
