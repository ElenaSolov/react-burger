import React, {useMemo, useEffect} from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burgerConstructor.module.css";
import OrderTotal from "../orderTotal/OrderTotal";
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
// import { addScroll } from "../../utils/utils";
import {ORDER_INGREDIENT, ORDER_BUN} from "../../services/actions/actions.js";
import { useDrop } from "react-dnd";


const BurgerConstructor = () => {
  const isLoaded =  useSelector(store => store.ingredientsRequestStatus);
  const ingredients = useSelector(store => store.ingredients);
  const orderedIngredients = useSelector(store => store.order.orderedIngredients, shallowEqual);
  const order = useSelector(store => store.order);
  const dispatch = useDispatch();
  const mainBun = useSelector(store => store.order.orderedBun);

  const [{isHover}, dropTarget] = useDrop({
          accept: "ingredient",
          drop: (item)  =>  onDropHandler(item),
          collect: monitor => ({
                      isHover: monitor.isOver(),
                  })
      });
  const onDropHandler = (ingredient) => {
      if(ingredient.type === 'bun'){
        dispatch({type: ORDER_BUN, ingredient});
        console.log(mainBun);
        } else {
        dispatch({type:ORDER_INGREDIENT, ingredient});
      }
      console.log(orderedIngredients)
  }
      const borderColor = isHover ? 'lightgreen' : 'transparent';

  useEffect(() => {
//        orderedIngredients.length>0&&addScroll('.constructorScroll', '.bottom');
  isLoaded&&dispatch({type: ORDER_BUN, ingredient: ingredients.find(i => i.type === 'bun')});
  }, [isLoaded, dispatch, ingredients]);

  const totalPrice = useMemo(
    ()=>{
      if(!isLoaded) return 0;
      if(orderedIngredients.length>0){
       return orderedIngredients.reduce((prev, next) => prev+next.price, 0) + mainBun.price *2;
      };
      return mainBun.price *2;
    }, [orderedIngredients, mainBun, isLoaded]);


  return (

    isLoaded&&<section ref={dropTarget} className={`${constructorStyles.constructor} pl-4`} style={{borderColor: borderColor}}>
      <ul className={`${constructorStyles.list} mt-25`} >
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
          {orderedIngredients.map((ingredient) => {
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
