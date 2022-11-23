import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import { getUser } from "../services/actions/authActions";
import { useDispatch, useSelector } from "../services/hooks";
import OrderCard from "../components/orderCard/OrderCard";
import { useNavigate } from "react-router-dom";
import {
  startConnection,
  closeConnection,
} from "../services/actions/wsActions";
import ProfileNav from "../components/profileNav/ProfileNav";
import { addScroll, getCookie } from "../utils/utils";

function ProfileOrders(): JSX.Element {
  const user = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feed.orders.reverse());
  const isError = useSelector((store) => store.feed.wsError);
  const token = getCookie("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
    if (!token) {
      navigate("login", { replace: true, state: "/profile/orders" });
    } else {
      dispatch(startConnection(token));
    }
    return () => {
      dispatch(closeConnection());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user.isAuth]);

  useEffect(() => {
    if (orders.length > 2 && !isError) addScroll(".ordersScroll", ".bottom");
  }, [orders.length, isError]);

  return (
    <section className={pagesStyles.page}>
      <ProfileNav />
      {isError ? (
        <h1
          className={`${pagesStyles.feedTitle} ${pagesStyles.error} ${pagesStyles.profileError} text text_type_main-large `}
        >
          Что-то пошло не так, попробуйте обновить страницу
        </h1>
      ) : (
        <ul className={`${pagesStyles.myOrders} ml-15 ordersScroll`}>
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ProfileOrders;
