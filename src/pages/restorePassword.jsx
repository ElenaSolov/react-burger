import React, { useRef, useEffect } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { Link, useNavigate } from "react-router-dom";
import { restorePassword } from "../services/actions/authActions";
import { validateEmail } from "../utils/utils";
import { useSelector, useDispatch } from "react-redux";

function RestorePasswordPage() {
  const ref = useRef();
  let navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuth) navigate("/profile");
    if (!auth.isAuth && auth.email)
      navigate("reset", { state: "forgot-password" });
  }, [auth, navigate]);

  const onClick = (e) => {
    e.preventDefault();
    if (validateEmail(ref.current.elements.email.value)) {
      dispatch(restorePassword(ref.current.elements.email.value));
    }
  };
  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <form ref={ref} className={pagesStyles.form}>
          <InputEl type="email" placeholder="Укажите e-mail" />
          <div className="mt-6">
            <Button type="primary" size="medium" onClick={onClick}>
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
