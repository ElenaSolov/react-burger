import React, { useEffect, useRef } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../services/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { getFormValues } from "../utils/utils";

function LoginPage() {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const ref = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirectPath = location.state ? location.state : "/profile";
  require("react-dom");
  window.React2 = require("react");
  console.log(window.React1 === window.React2);

  useEffect(() => {
    if (auth.isAuth) navigate(redirectPath);
  }, [auth, navigate, redirectPath]);

  const onSubmit = (e) => {
    e.preventDefault();
    const values = getFormValues(ref.current.elements);
    dispatch(login(values[0], values[1]));
  };

  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Вход
        </h2>
        <form onSubmit={onSubmit} ref={ref} className={pagesStyles.form}>
          <InputEl type="email" />
          <InputEl type="password" placeholder="Пароль" />
          <div className="mt-6">
            <Button
              type="primary"
              size="medium"
              onClick={(e) => e.preventDefault}
            >
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
