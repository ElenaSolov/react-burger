import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { Link } from "react-router-dom";

function RestorePasswordPage() {
  return (
    <section className={pagesStyles.login}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <form className={pagesStyles.form}>
          <InputEl type="email" placeholder="Укажите e-mail" />
          <div className="mt-6">
            <Button type="primary" size="medium" onClick={() => {}}>
              Восстановить
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вспомнили пароль?
          <Link to="/login" className={pagesStyles.link}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RestorePasswordPage;
