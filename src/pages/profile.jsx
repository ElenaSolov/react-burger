import React from "react";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { NavLink } from "react-router-dom";

function Profile() {
  const className = `${pagesStyles.profileLink} text text_type_main-medium text_color_inactive`;
  const activeClassName = `${pagesStyles.profileLink} ${pagesStyles.profileLinkActive} text text_type_main-medium`;
  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.profile}>
        <div>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? activeClassName : className
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : className
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : className
            }
          >
            Выход
          </NavLink>
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
