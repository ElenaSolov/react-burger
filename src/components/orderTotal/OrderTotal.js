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


  const noIngredients = (
    <h2 className={`${orderTotalStyles.text} text text_type_main-large`}>
      Пожалуйста, выберете начинки
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

  const [open, setOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(noIngredients);
  const [isDisabled, setDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('Оформить заказ');

  const changeButton = (disable) => {
    if(disable){
      setDisabled(true);
      setButtonText('Оформляем...')
    } else {
      setDisabled(false);
      setButtonText('Оформить заказ')
    }
  }

  useEffect(() => {
    return () => {
      setOpen(false);
      setModalContent("");
    };
  }, []);

  const openOrderModal = () => {
    setOpen(true);
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
      sendOrder([bun, ...totalIngredients, bun], openOrderModal, totalPrice, changeButton)
    );
  };

  return (
    <div className={`${orderTotalStyles.orderTotal} mt-10`}>
      <p
        className={`${orderTotalStyles.total} text text_type_digits-medium mr-10`}
      >
        {totalPrice}
        <span className={orderTotalStyles.priceIcon}>
          <CurrencyIcon type="primary" />
        </span>
      </p>
      <div className={orderTotalStyles.btn}>
        <Button type="primary" size="medium" onClick={makeOrder}  disabled={isDisabled}>
          {buttonText}
        </Button>
      </div>
      <div className={orderTotalStyles.btn_type_mobile}>
        <Button type="primary" size="small">
          Смотреть заказ
        </Button>
      </div>
      {open && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
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
