import React from 'react';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import orderTotalStyles from './orderTotal.module.css';
import PropTypes from "prop-types";

const OrderTotal = ({CurrencyIcon}) => {
  return (
    <div className={`${orderTotalStyles.orderTotal} mt-10`}>
      <p className={`text text_type_digits-medium mr-10`}>0
        <span className={orderTotalStyles.priceIcon}>
        < CurrencyIcon type='primary'/>
        </span>
      </p>
      <Button type="primary" size="medium" >
        Оформить заказ
      </Button>
    </div>
  );
};
OrderTotal.propTypes = {
  CurrencyIcon: PropTypes.func
}
export default OrderTotal;