import React, { useEffect, useRef } from "react";
import pagesStyles from "./pages.module.css";
import InputEl from "../components/inputEl/InputEl";
import { NavLink } from "react-router-dom";
import {
  getUser,
  logout,
  updateUserInfo,
} from "../services/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getFormValues } from "../utils/utils";

function Profile() {
  const user = useSelector((store) => store.auth);
  const [reset, setReset] = React.useState(false);
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, user.isAuth]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.textContent === "Отмена") {
      setReset(true);
    } else {
      const values = getFormValues(ref.current.elements);
      console.log(values);
      dispatch(updateUserInfo(values[0], values[1], values[2]));
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    setReset(true);
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
            to="/"
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
          <form ref={ref} className={pagesStyles.form} onSubmit={onSubmit}>
            <InputEl
              reset={reset}
              setReset={setReset}
              type="text"
              placeholder="Имя"
              margin={0}
              initialValue={user.name}
            />
            <InputEl
              reset={reset}
              setReset={setReset}
              type="email"
              placeholder="Логин"
              initialValue={user.email}
            />
            <InputEl
              type="password"
              placeholder="Пароль"
              reset={reset}
              setReset={setReset}
            />
            <div className={`${pagesStyles.buttonBar} mt-6`}>
              <Button onClick={onCancel} type="secondary" size="medium">
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
