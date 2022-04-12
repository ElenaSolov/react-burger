import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import orderTotalStyles from "./orderTotal.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modals/modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";
import { sendOrder } from "../../utils/api.js";
import PropTypes from "prop-types";
import propTypesConfig from "../../utils/propTypesConfig";

const OrderTotal = ({ orderTotal }) => {
  const [open, setOpen] = React.useState(false);
  const [orderNum, setOrderNum] = React.useState("");

  const makeOrder = () => {
    sendOrder(orderTotal.ingredients)
      .then((res) => {
        setOrderNum(res.order.number);
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`${orderTotalStyles.orderTotal} mt-10`}>
      <p className={`text text_type_digits-medium mr-10`}>
        {orderTotal.orderTotal}
        <span className={orderTotalStyles.priceIcon}>
          <CurrencyIcon type="primary" />
        </span>
      </p>
      <Button type="primary" size="medium" onClick={makeOrder}>
        Оформить заказ
      </Button>
      {open && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <OrderDetails orderNum={orderNum} />
        </Modal>
      )}
    </div>
  );
};

OrderTotal.propTypes = {
  orderTotal: PropTypes.shape({
    orderTotal: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.shape(propTypesConfig).isRequired),
  }).isRequired,
};

export default OrderTotal;
