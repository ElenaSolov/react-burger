import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderFeedDetails from "../components/orderFeedDetails/OrderFeedDetails";
import {
  startConnection,
  closeConnection,
} from "../services/actions/wsActions";

function OrderPage() {
  const location = useLocation();
  const locationArr = location.pathname.split("/");
  const number = locationArr[locationArr.length - 1];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startConnection("all"));
    return () => dispatch(closeConnection());
  }, [dispatch]);
  const orders = useSelector((store) => store.feed.orders);
  const order = orders.find((order) => order.number.toString() === number);

  //   const { order } = location.state;
  return (
    <section className={pagesStyles.page}>
      {order && <OrderFeedDetails order={order} />}
    </section>
  );
}

export default OrderPage;
