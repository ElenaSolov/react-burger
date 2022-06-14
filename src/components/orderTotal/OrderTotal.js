import React, { useEffect } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import orderTotalStyles from "./orderTotal.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modals/modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";
import { sendOrder } from "../../services/actions/actions.js";
import PropTypes from "prop-types";
import propTypesConfig from "../../utils/propTypesConfig";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderTotal = ({ totalIngredients, totalPrice, bun }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const [open, setOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

  const noIngredients = (
    <h2 className={`${orderTotalStyles.text} text text_type_main-large`}>
      Пожалуйста, выберете булку и начинки
    </h2>
  );
  const noBun = (
    <h2 className={`${orderTotalStyles.text} text text_type_main-large`}>
      Пожалуйста, выберете булку
    </h2>
  );
  const sending = (
    <h2 className={`${orderTotalStyles.text} text text_type_main-large`}>
      Пожалуйста, подождите, мы оформляем Ваш заказ...
    </h2>
  );

  useEffect(() => {
    return () => {
      setOpen(false);
      setModalContent("");
    };
  }, []);

  const openOrderModal = () => {
    setModalContent(<OrderDetails />);
  };

  const makeOrder = () => {
    if (!auth.isAuth) {
      navigate("login", { replace: true, state: "/" });
      return;
    }
    if (totalIngredients.length === 0) {
      setModalContent(noIngredients);
      setOpen(true);
      return;
    } else if (!bun._id) {
      setModalContent(noBun);
      setOpen(true);
      return;
    }
    setModalContent(sending);
    setOpen(true);
    dispatch(
      sendOrder([bun, ...totalIngredients, bun], openOrderModal, totalPrice)
    );
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
          {/*<OrderDetails />*/}
          {modalContent}
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
