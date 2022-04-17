import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import orderTotalStyles from "./orderTotal.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modals/modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";
import { sendOrder } from "../../utils/api.js";
import PropTypes from "prop-types";
import propTypesConfig from "../../utils/propTypesConfig";

const OrderTotal = ({ totalIngredients, totalPrice }) => {
console.log(totalPrice);
  const [open, setOpen] = React.useState(false);
  const [orderNum, setOrderNum] = React.useState("");

  const makeOrder = () => {
    sendOrder(totalIngredients.ingredients)
      .then((res) => {
        setOrderNum(res.order.number);
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`${orderTotalStyles.orderTotal} mt-10`}>
      <p className={`text text_type_digits-medium mr-10`}>
        {totalPrice}
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
    totalPrice: PropTypes.number.isRequired,
    totalIngredients: PropTypes.arrayOf(PropTypes.shape(propTypesConfig).isRequired),
};

export default OrderTotal;
