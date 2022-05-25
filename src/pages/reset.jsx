import React, { useRef, useEffect } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getFormValues } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/actions/authActions";

const ResetPasswordPage = () => {
  console.log("ResetPasswordPage");
  const ref = useRef();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const location = useLocation();
  const navigate = useNavigate();

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
    let values = getFormValues(ref.current.elements);
    console.log(values);
    dispatch(resetPassword(values[0], values[1]));
  };

  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <form onSubmit={onSubmit} className={pagesStyles.form} ref={ref}>
          <InputEl
            type="text"
            placeholder="Введите новый пароль"
            margin={true}
          />
          <InputEl placeholder="Введите код из письма" margin={true} />
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
