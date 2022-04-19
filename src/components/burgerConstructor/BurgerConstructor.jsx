import React, {useEffect, useMemo} from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burgerConstructor.module.css";
import OrderTotal from "../orderTotal/OrderTotal";
import {useSelector, useDispatch} from 'react-redux';
import { addScroll } from "../../utils/utils";
import {ADD_INGREDIENT} from "../../services/actions/actions.js";


const BurgerConstructor = () => {
  const isLoaded =  useSelector(store => store.ingredientsRequestStatus);
  const ingredients = useSelector(store => store.ingredients);
  const order = useSelector(store => store.order);
  const dispatch = useDispatch();
  const mainBun = useMemo(
  ()=> {
  return ingredients.find((ingredient) => ingredient.name === "Краторная булка N-200i")
  }, [ingredients]);
  const restIngredients = useMemo(
  ()=>{
  return ingredients.filter((ingredient) => ingredient.type !== "bun");
  }, [ingredients]
  )

  useEffect(() => {
       isLoaded&&addScroll();
       isLoaded&&dispatch({type: ADD_INGREDIENT, ingredient: mainBun});
       isLoaded&&restIngredients.forEach((ingredient) =>
             dispatch({ type: ADD_INGREDIENT, ingredient: ingredient }));
  }, [isLoaded, dispatch, mainBun, restIngredients]);

  const totalPrice = useMemo(
    ()=>{
      if(order.orderedIngredients.length>0){
       return order.orderedIngredients.reduce((prev, next) => prev+next.price, 0)
      };
      return 0;
    }, [order.orderedIngredients]);


  return (

    isLoaded&&<section className={`${constructorStyles.constructor} pl-4`}>
      <ul className={`${constructorStyles.list} mt-25`}>
        <li className={`${constructorStyles.bun} ml-8 mr-4 mb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${mainBun.name} (верх)`}
            price={`${mainBun.price}`}
            thumbnail={`${mainBun.image}`}
          />
        </li>
        <ul className={`${constructorStyles.list} constructorScroll mb-4`}>
          {restIngredients.map((ingredient) => {
            return (
              <li
                key={`${ingredient._id}`}
                className={`${constructorStyles.item} ml-8 mr-4 mb-4`}
              >
              <span className={constructorStyles.dragIcon}><DragIcon type='primary' /></span>
                <ConstructorElement
                  isLocked={false}
                  text={`${ingredient.name}`}
                  price={`${ingredient.price}`}
                  thumbnail={`${ingredient.image}`}
                />
              </li>
            );
          })}
        </ul>
        <li className={`${constructorStyles.bun} ml-8 mr-4 pt-4 bottom`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${mainBun.name} (низ)`}
            price={`${mainBun.price}`}
            thumbnail={`${mainBun.image}`}
          />
        </li>
      </ul>
      <OrderTotal totalIngredients={order.orderedIngredients} totalPrice={totalPrice}  />
    </section>
  );
};

export default BurgerConstructor;
