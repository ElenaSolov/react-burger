import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function Profile() {
  const user = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, user.isAuth]);
  console.log(user);

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
            <InputEl
              type="text"
              placeholder="Имя"
              margin={0}
              initialValue={user.name}
            />
            <InputEl
              type="text"
              placeholder="Логин"
              initialValue={user.email}
            />
            <InputEl type="password" placeholder="Пароль" />
            <div className={`${pagesStyles.buttonBar} mt-6`}>
              <Button type="secondary" size="medium">
                Отмена
              </Button>
              <Button type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;
