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

function ProfileOrders() {
  const user = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feed.orders.reverse());
  console.log(orders);

  useEffect(() => {
    dispatch(getUser());
    dispatch(startConnection("orders"));
  }, [dispatch, user.isAuth]);

  useEffect(() => {
    return () => dispatch(closeConnection());
  }, [dispatch]);

  return (
    <section className={pagesStyles.page}>
      <ProfileNav />
      <ul className={`${pagesStyles.myOrders} ml-15`}>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </ul>
    </section>
  );
}

export default ProfileOrders;
