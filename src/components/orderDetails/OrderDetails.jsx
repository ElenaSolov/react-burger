import React from "react";
import orderDetailsStyles from "./orderDetails.module.css";
import img from "../../images/order-done.png";
import PropTypes from "prop-types";

const OrderDetails = ({ orderNum }) => {
  return (
    <>
      <p
        className={`${orderDetailsStyles.orderNumber} text text_type_digits-large`}
      >
        {orderNum}
      </p>
      <p className={"text text_type_main-medium mt-8"}>идентификатор заказа</p>
      <img
        className={`${orderDetailsStyles.img} mt-15`}
        src={img}
        alt="Заказ сделан"
      />
      <p className={"text text_type_main-default mt-15 "}>
        Ваш заказ начали готовить
      </p>
      <p className={` mt-2 mb-30`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

OrderDetails.propTypes = {
  orderNum: PropTypes.number.isRequired,
};

export default OrderDetails;
