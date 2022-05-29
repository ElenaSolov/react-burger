import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import { NavLink } from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getUser,
  logout,
  updateUserInfo,
} from "../services/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { onInputChange } from "../utils/utils";

function Profile() {
  const user = useSelector((store) => store.auth);
  const [name, setName] = React.useState(user.name);
  const [emailValue, setEmailValue] = React.useState(user.email);
  const [passwordValue, setPasswordValue] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, user.isAuth]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (document.activeElement.textContent === "Отмена") {
      onCancel();
    } else {
      dispatch(updateUserInfo(name, emailValue, passwordValue));
    }
  };

  const onCancel = () => {
    setName(user.name);
    setEmailValue(user.email);
    setPasswordValue("");
  };

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
            to="orders"
            className={({ isActive }) =>
              isActive ? activeClassName : className
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              dispatch(logout());
            }}
            className={className}
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
              <Input
                type="email"
                placeholder="Логин"
                value={emailValue}
                onChange={(e) => onInputChange(e, setEmailValue)}
              />
            </div>
            <div className={`${pagesStyles.input} mt-6`}>
              <PasswordInput
                type="password"
                placeholder="Пароль"
                value={passwordValue}
                onChange={(e) => onInputChange(e, setPasswordValue)}
              />
            </div>
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
