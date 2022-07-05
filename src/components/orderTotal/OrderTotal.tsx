import React, { FC, useEffect } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import orderTotalStyles from "./orderTotal.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modals/modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";
import { sendOrder } from "../../services/actions/actions";
import { useDispatch, useSelector } from "../../services/hooks";
import { useNavigate } from "react-router-dom";
import { TIngredient } from "../../services/types/data";

interface IOrderTotal {
  totalPrice: number;
  totalIngredients: Array<TIngredient>;
  bun: TIngredient;
}
const OrderTotal: FC<IOrderTotal> = ({ totalIngredients, totalPrice, bun }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

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

  const [modalContent, setModalContent] =
    React.useState<JSX.Element>(noIngredients);

  useEffect(() => {
    return () => {
      setOpen(false);
      setModalContent(noIngredients);
      // setDisabled(false);
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
    setDisabled(true);
    console.log(disabled);
    setOpen(true);

    console.log(totalIngredients);
    dispatch(
      sendOrder(
        [bun, ...totalIngredients, bun],
        openOrderModal,
        totalPrice,
        setDisabled
      )
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
        <Button
          type="primary"
          size="medium"
          onClick={makeOrder}
          disabled={disabled}
        >
          Оформить заказ
        </Button>
      </div>
      <div className={orderTotalStyles.btn_type_mobile}>
        <Button type="primary" size="small">
          Смотреть заказ
        </Button>
      </div>
      {open && <Modal onClose={() => setOpen(false)}>{modalContent}</Modal>}
    </div>
  );
};

export default OrderTotal;
