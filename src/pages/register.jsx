import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/actions/authActions";
import { getFormValues } from "../utils/utils";

function RegisterPage() {
  const ref = useRef();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuth) navigate("/");
  }, [auth, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    let values = getFormValues(ref.current.elements);
    dispatch(register(values.email, values.password, values.text));
  };

  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Регистрация
        </h2>
        <form ref={ref} className={pagesStyles.form} onSubmit={onSubmit}>
          <InputEl type="text" placeholder="Имя" />
          <InputEl type="email" placeholder="E-mail" />
          <InputEl type="password" placeholder="Пароль" />
          <div className="mt-6">
            <Button
              type="primary"
              size="medium"
              onClick={(e) => e.preventDefault}
            >
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
