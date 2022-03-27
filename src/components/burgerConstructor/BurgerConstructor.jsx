import React, {useEffect, useState} from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from './burgerConstructor.module.css';
import OrderTotal from "../orderTotal/OrderTotal";
import propTypesConfig from "../../utils/propTypesConfig";

const BurgerConstructor = ({ingredients}) => {
  
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
          <OrderTotal />
        </section>)
      
    }

BurgerConstructor.propTypes = propTypesConfig;
export default BurgerConstructor;