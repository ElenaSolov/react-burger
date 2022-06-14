import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import { getUser } from "../services/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../components/orderCard/OrderCard";
import {
  startConnection,
  closeConnection,
} from "../services/actions/wsActions";
import ProfileNav from "../components/profileNav/ProfileNav";
import { addScroll } from "../utils/utils";

function ProfileOrders() {
  const user = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feed.orders.reverse());

  useEffect(() => {
    dispatch(getUser());
    dispatch(startConnection("orders"));
    return () => dispatch(closeConnection());
  }, [dispatch, user.isAuth]);

  useEffect(() => {
    if (orders.length > 2) addScroll(".ordersScroll", ".bottom");
  }, [orders.length]);

  return (
    <section className={pagesStyles.page}>
      <ProfileNav />
      <ul className={`${pagesStyles.myOrders} ml-15 ordersScroll`}>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </ul>
    </section>
  );
}

export default ProfileOrders;
