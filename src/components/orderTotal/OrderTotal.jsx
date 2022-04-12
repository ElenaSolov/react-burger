import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import orderTotalStyles from "./orderTotal.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modals/modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";

const OrderTotal = ({ orderTotal }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={`${orderTotalStyles.orderTotal} mt-10`}>
      <p className={`text text_type_digits-medium mr-10`}>
        {orderTotal.orderTotal}
        <span className={orderTotalStyles.priceIcon}>
          <CurrencyIcon type="primary" />
        </span>
      </p>
      <Button type="primary" size="medium" onClick={() => setOpen(true)}>
        Оформить заказ
      </Button>
      {open && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default OrderTotal;
