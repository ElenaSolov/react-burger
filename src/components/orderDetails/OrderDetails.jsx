import React from "react";
import orderDetailsStyles from "./orderDetails.module.css";
import img from "../../images/order-done.png";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const orders = useSelector((store) => store.order.orders);

  return (
    <>
      <p
        className={`${orderDetailsStyles.orderNumber} text text_type_digits-large`}
      >
        {orders[orders.length - 1].orderNum}
      </p>
      <p
        className={`${orderDetailsStyles.text_size_l} text text_type_main-medium mt-8`}
      >
        идентификатор заказа
      </p>
      <img
        className={`${orderDetailsStyles.img} mt-15`}
        src={img}
        alt="Заказ сделан"
      />
      <p
        className={`${orderDetailsStyles.text_size_m} text text_type_main-default mt-15 `}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsStyles.text_size_m} text text_type_main-default mt-2 mb-30 text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
