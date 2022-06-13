import React from "react";
import pagesStyles from "./pages.module.css";
import { useLocation } from "react-router-dom";
import OrderFeedDetails from "../components/orderFeedDetails/OrderFeedDetails";

function OrderPage() {
  const location = useLocation();
  const { order } = location.state;
  console.log(order);
  return (
    <section className={pagesStyles.page}>
      <OrderFeedDetails order={order} />
    </section>
  );
}

export default OrderPage;
