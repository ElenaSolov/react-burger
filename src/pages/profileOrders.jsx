import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import { getUser } from "../services/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../components/orderCard/OrderCard";
import { startConnection } from "../services/actions/wsActions";
import { addScroll } from "../utils/utils";
import ProfileNav from "../components/profileNav/ProfileNav";

function ProfileOrders() {
  const user = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feed.orders);
  console.log(orders);

  useEffect(() => {
    dispatch(getUser());
    dispatch(startConnection("orders"));
    addScroll(".ordersScroll", ".bottom");
  }, [dispatch, user.isAuth, orders.length]);

  return (
    <section className={pagesStyles.page}>
      <ProfileNav />
      <ul className={`${pagesStyles.myOrders} mr-15 ordersScroll`}>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </ul>
    </section>
  );
}

export default ProfileOrders;
