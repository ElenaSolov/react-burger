import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import orderTotalStyles from "./orderTotal.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modals/modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";
import { sendOrder } from "../../services/actions/actions.js";
import PropTypes from "prop-types";
import propTypesConfig from "../../utils/propTypesConfig";
import { useDispatch, useSelector } from "react-redux";
import { openOrderModal } from "../../services/actions/modalActions";
import { useNavigate } from "react-router-dom";

const OrderTotal = ({ totalIngredients, totalPrice }) => {
  const dispatch = useDispatch();
  const open = useSelector((store) => store.modal.openOrderModal);
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const makeOrder = () => {
    if (totalIngredients.length === 0) return;
    if (!auth.isAuth) {
      navigate("login", { replace: true, state: "/" });
      return;
    }
    dispatch(sendOrder(totalIngredients, openOrderModal, totalPrice));
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
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

OrderTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  totalIngredients: PropTypes.arrayOf(
    PropTypes.shape(propTypesConfig).isRequired
  ),
};

export default OrderTotal;
