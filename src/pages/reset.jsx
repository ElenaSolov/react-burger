import React, { useRef } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { Link } from "react-router-dom";

function ResetPasswordPage() {
  const ref = useRef();
  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <form className={pagesStyles.form} ref={ref}>
          <InputEl
            type="text"
            placeholder="Введите новый пароль"
            margin={true}
          />
          <InputEl
            type="text"
            placeholder="Введите код из письма"
            margin={true}
          />
          <div className="mt-6">
            <Button type="primary" size="medium" onClick={() => {}}>
              Сохранить
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

export default ResetPasswordPage;
