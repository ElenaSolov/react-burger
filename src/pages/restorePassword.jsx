import React, { useEffect } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { restorePassword } from "../services/actions/authActions";
import { validateEmail, onInputChange } from "../utils/utils";
import { useSelector, useDispatch } from "react-redux";

function RestorePasswordPage() {
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = React.useState("");

  useEffect(() => {
    if (!auth.isAuth && auth.email)
      navigate("reset", { state: "forgot-password" });
  }, [auth, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateEmail(emailValue)) {
      dispatch(restorePassword(emailValue));
    }
  };
  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <form onSubmit={onSubmit} className={pagesStyles.form}>
          <div className={`${pagesStyles.input} mt-6`}>
            <Input
              type="email"
              placeholder="Укажите e-mail"
              value={emailValue}
              onChange={(e) => onInputChange(e, setEmailValue)}
            />
          </div>
          <div className="mt-6">
            <Button type="primary" size="medium">
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
