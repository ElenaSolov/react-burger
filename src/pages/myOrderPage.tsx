import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import OrderFeedDetails from "../components/orderFeedDetails/OrderFeedDetails";
import { getOrderDetails } from "../services/actions/actions";
import { IOrder } from "../services/types/data";

function MyOrderPage(): JSX.Element {
  const orderFailed = useSelector((store) => store.order.orderFailed);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);
  const order = useSelector((store) => store.order.order);

  function isOrderFound(order: IOrder | object): order is IOrder {
    return "number" in order;
  }
  return (
    <section className={pagesStyles.page}>
      {orderFailed ? (
        <h1 className="text text_type_main-large">Что-то пошло не так...</h1>
      ) : isOrderFound(order) ? (
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
