import React from 'react';
import orderAcceptedPopupStyles from './orderAcceptedPopup.module.css';
import img from '../../images/order-done.png';

const OrderAcceptedPopup = ({icons}) => {
  return (
    <div className={orderAcceptedPopupStyles.popup}>
      <div className={orderAcceptedPopupStyles.popupWindow}>
        <button className={`${orderAcceptedPopupStyles.closeBtn} mt-15 mr-10`}>
          <icons.CloseIcon />
        </button>
        <p className={`${orderAcceptedPopupStyles.orderNumber} text text_type_digits-large`}>034536</p>
        <p className={'text text_type_main-medium mt-8'}>идентификатор заказа</p>
        <img className={`${orderAcceptedPopupStyles.img} mt-15`} src={img} alt='Заказ сделан' />
        <p className={'text text_type_main-default mt-15 '}>Ваш заказ начали готовить</p>
        <p className={`${orderAcceptedPopupStyles.text} mt-2`}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  );
};

export default OrderAcceptedPopup;