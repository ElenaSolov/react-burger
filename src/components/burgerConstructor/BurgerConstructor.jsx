import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import img from './../../images/bun1.png';
import constructorStyles from './burgerConstructor.module.css';
import OrderTotal from "../orderTotal/OrderTotal";
import PropTypes from 'prop-types';

const BurgerConstructor = ({icons}) => {
 
  return (
    <section className={`${constructorStyles.constructor} pl-4 pr-4 vScroll`}>
    <ul className={`${constructorStyles.list} mt-25`}>
      <li className={`${constructorStyles.item} ml-8 mb-4`}>
        <ConstructorElement
        isLocked={true}
        type="top"
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={img}
      />
      </li>
      <li className={`${constructorStyles.item} mb-4`}>
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
        />
      </li>
      <li className={`${constructorStyles.item} ml-8 mb-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={img}
        />
      </li>
    </ul>
      <OrderTotal CurrencyIcon={icons.CurrencyIcon} />
    </section>
  );
};

BurgerConstructor.propTypes={
  icons: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object]))
}
export default BurgerConstructor;