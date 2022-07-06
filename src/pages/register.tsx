import React from "react";
import { useDispatch } from "../services/hooks";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import {
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { register } from "../services/actions/authActions";
import { onInputChange } from "../utils/utils";

function RegisterPage() {
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(emailValue, passwordValue, name));
  };

  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Регистрация
        </h2>
        <form className={pagesStyles.form} onSubmit={onSubmit}>
          <div className={`${pagesStyles.input} mt-6`}>
            <Input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => onInputChange(e, setName)}
            />
          </div>
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
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Уже зарегистрированы?
          <Link to="/login" className={pagesStyles.link}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
