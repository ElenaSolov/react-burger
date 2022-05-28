import React, { useEffect } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onInputChange } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/actions/authActions";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordValue, setPasswordValue] = React.useState("");
  const [codeValue, setCodeValue] = React.useState("");

  useEffect(() => {
    if (location.state !== "forgot-password") {
      navigate("/forgot-password");
    }
    if (auth.isAuth) {
      navigate("/profile");
    }
    if (auth.resetPassword) {
      navigate("/login");
    }
  }, [auth, location, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(passwordValue, codeValue));
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
              type="text"
              placeholder="Введите новый пароль"
              value={passwordValue}
              onChange={(e) => onInputChange(e, setPasswordValue)}
            />
          </div>
          <div className={`${pagesStyles.input} mt-6`}>
            <Input
              type="text"
              placeholder="Введите код из письма"
              value={codeValue}
              onChange={(e) => onInputChange(e, setCodeValue)}
            />
          </div>

          <div className="mt-6">
            <Button type="primary" size="medium" onClick={onSubmit}>
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
};

export default ResetPasswordPage;
