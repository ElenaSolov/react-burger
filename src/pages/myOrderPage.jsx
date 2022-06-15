import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderFeedDetails from "../components/orderFeedDetails/OrderFeedDetails";
import { getOrderDetails } from "../services/actions/actions";

function MyOrderPage() {
  const location = useLocation();
  location.state = location.pathname;
  const locationArr = location.pathname.split("/");
  const number = locationArr[locationArr.length - 1];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(number));
  }, [dispatch, number]);
  const order = useSelector((store) => store.order.order);

  return (
    <section className={pagesStyles.page}>
      {order && <OrderFeedDetails order={order} />}
    </section>
  );
}

export default MyOrderPage;
