import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderFeedDetails from "../components/orderFeedDetails/OrderFeedDetails";
import { getOrderDetails } from "../services/actions/actions";

function MyOrderPage() {
  const orderFailed = useSelector((store) => store.order.orderFailed);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);
  const order = useSelector((store) => store.order.order);
  return (
    <section className={pagesStyles.page}>
      {orderFailed ? (
        <h1 className="text text_type_main-large">Что-то пошло не так...</h1>
      ) : order && order.number ? (
        <OrderFeedDetails order={order} />
      ) : (
        <h1 className="text text_type_main-large">
          Такого заказа нет. Проверьте, пожалуйста, номер
        </h1>
      )}
    </section>
  );
}

export default MyOrderPage;
