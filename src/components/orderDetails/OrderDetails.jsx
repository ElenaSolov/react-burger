import React from 'react';
import orderDetailsStyles from './orderDetails.module.css';
import img from '../../images/order-done.png';

const OrderDetails = () => {


return (
  <>
    <p className={`${orderDetailsStyles.orderNumber} text text_type_digits-large`}>034536</p>
    <p className={'text text_type_main-medium mt-8'}>идентификатор заказа</p>
    <img className={`${orderDetailsStyles.img} mt-15`} src={img} alt='Заказ сделан' />
    <p className={'text text_type_main-default mt-15 '}>Ваш заказ начали готовить</p>
    <p className={`${orderDetailsStyles.text} mt-2`}>Дождитесь готовности на орбитальной станции</p>
  </>
  )
}

export default OrderDetails;