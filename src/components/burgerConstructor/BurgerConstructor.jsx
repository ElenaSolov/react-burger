import React, {useEffect, useState} from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from './burgerConstructor.module.css';
import OrderTotal from "../orderTotal/OrderTotal";
import PropTypes from 'prop-types';

const BurgerConstructor = ({icons, ingredients}) => {
  
  const mainBun = ingredients.find(ingredient => ingredient.name === 'Краторная булка N-200i');
      return (
        <section className={`${constructorStyles.constructor} pl-4`}>
          <ul className={`${constructorStyles.list} mt-25`}>
            <li className={`${constructorStyles.item} ml-8 mr-4 mb-4`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${mainBun.name}`}
                price={`${mainBun.price}`}
                thumbnail={`${mainBun.image}`}
              />
            </li>
            <ul className={`${constructorStyles.list} constructorScroll mb-4`}>
              {ingredients.filter(ingredient=> ingredient.type !== "bun").map(ingredient => {
                return (<li key = {`${ingredient._id}`} className={`${constructorStyles.item} ml-8 mr-4 mb-4`}>
                  <ConstructorElement
                    isLocked={false}
                    text={`${ingredient.name}`}
                    price={`${ingredient.price}`}
                    thumbnail={`${ingredient.image}`}
                  />
                </li>)
              })}
            </ul>
            <li className={`${constructorStyles.item} ml-8 mr-4 pt-4 bottom`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${mainBun.name}`}
                price={`${mainBun.price}`}
                thumbnail={`${mainBun.image}`}
              />
            </li>
          </ul>
          <OrderTotal CurrencyIcon={icons.CurrencyIcon} />
        </section>)
      
    }

BurgerConstructor.propTypes = {
  icons: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
  ingredients: PropTypes.arrayOf(PropTypes.exact({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat:PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string,
  }))
}
export default BurgerConstructor;