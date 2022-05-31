import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import { NavLink } from "react-router-dom";
import { getUser, logout } from "../services/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../components/orderCard/OrderCard";

function ProfileOrders() {
  const user = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, user.isAuth]);

  const className = `${pagesStyles.profileLink} text text_type_main-medium text_color_inactive`;
  const activeClassName = `${pagesStyles.profileLink} ${pagesStyles.profileLinkActive} text text_type_main-medium`;

  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.profile}>
        <div>
          <NavLink
            to="/profile"
            exact="true"
            className={({ isActive }) =>
              isActive ? activeClassName : className
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="profile/orders"
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
        <ul className={pagesStyles.myOrders}>
          <OrderCard
            id="034535"
            date="Сегодня, 16:20 i-GMT+3"
            name="Death Star Starship Main бургер"
            ingredients={[
              "60d3b41abdacab0026a733c7",
              "60d3b41abdacab0026a733ce",
              "60d3b41abdacab0026a733ca",
            ]}
            price={480}
          />
          <OrderCard
            id="034534"
            date="Сегодня, 13:20 i-GMT+3"
            name="Interstellar бургер"
            ingredients={[
              "60d3b41abdacab0026a733c7",
              "60d3b41abdacab0026a733d4",
              "60d3b41abdacab0026a733d3",
              "60d3b41abdacab0026a733c9",
              "60d3b41abdacab0026a733c8",
              "60d3b41abdacab0026a733cc",
              "60d3b41abdacab0026a733ce",
            ]}
            price={560}
          />
        </ul>
      </div>
    </section>
  );
}

export default ProfileOrders;
