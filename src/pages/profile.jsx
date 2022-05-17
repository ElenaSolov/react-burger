import React from "react";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.profile}>
        <div>
          <h2
            className={`${pagesStyles.profileLink} text text_type_main-medium`}
          >
            Профиль
          </h2>
          <Link
            to="/profile/orders"
            className={`${pagesStyles.profileLink} text text_type_main-medium text_color_inactive`}
          >
            История заказов
          </Link>
          <Link
            to="/"
            className={`${pagesStyles.profileLink} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </Link>
          <p
            className={`${pagesStyles.text} text text_type_main-default mt-20`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className="ml-15">
          <form className={pagesStyles.form}>
            <InputEl type="text" placeholder="Имя" margin={0} />
            <InputEl type="text" placeholder="Логин" />
            <InputEl type="password" placeholder="Пароль" />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;
