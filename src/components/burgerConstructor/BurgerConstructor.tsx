import React, { useMemo, useEffect, FunctionComponent } from "react";
import constructorStyles from "./burgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderTotal from "../orderTotal/OrderTotal";
import { useSelector, useDispatch } from "../../services/hooks";
import { addScroll } from "../../utils/utils";
import {
  orderIngredient,
  orderBun,
  moveIngredient,
} from "../../services/actions/actions";
import { useDrop } from "react-dnd";
import ConstructorItem from "../constructorItem/ConstructorItem";
import { v4 as uuidv4 } from "uuid";
import { IIngredient, isIngredient } from "../../services/types/data";

const BurgerConstructor: FunctionComponent = () => {
  const isLoaded = useSelector(
    (store) => store.ingredients.ingredientsRequestStatus
  );
  const orderedIngredients = useSelector(
    (store) => store.order.orderedIngredients
  );
  const order = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const mainBun = useSelector((store) => store.order.orderedBun);
  const moveItem = (dragIndex: number, hoverIndex: number): void => {
    const dragItem = orderedIngredients[dragIndex];
    const hoverItem = orderedIngredients[hoverIndex];
    // Swap places of dragItem and hoverItem in the ingredients array
    const updatedIngredients = [...orderedIngredients];
    updatedIngredients[dragIndex] = hoverItem;
    updatedIngredients[hoverIndex] = dragItem;
    dispatch(moveIngredient(updatedIngredients));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (item: IIngredient) => {
      console.log(item);
      onDropHandler(item);
    },
  });
  const onDropHandler = (ingredient: IIngredient) => {
    if (ingredient.type === "bun") {
      dispatch(orderBun(ingredient));
    } else if (ingredient.start === "constructor") {
      return;
    } else {
      const key = uuidv4();
      console.log(ingredient);
      dispatch(orderIngredient({ ...ingredient }, key));
    }
  };
  useEffect(() => {
    orderedIngredients.length > 5 && addScroll(".constructorScroll", ".bottom");
    console.log(orderedIngredients);
  }, [orderedIngredients]);


  const totalPrice = useMemo(() => {
    if (!isLoaded) return 0;
    const bunCost = isIngredient(mainBun) ? mainBun.price * 2 : 0;
    if (orderedIngredients.length > 0) {
      return (
        orderedIngredients.reduce((prev, next) => prev + next.price, 0) +
        bunCost
      );
    }
    return bunCost;
  }, [orderedIngredients, mainBun, isLoaded]);

  return (
    <section
      ref={dropTarget}
      className={`${constructorStyles.constructor} ml-4`}
    >
      {(!isLoaded ||
        (orderedIngredients.length < 1 && !isIngredient(mainBun))) && (
        <p
          className={`${constructorStyles.text} text text_type_main-large ml-4 mt-25 pt-15 text_color_inactive`}
        >
          Перенесите сюда булку и&nbsp;начинки для создания заказа
        </p>
      )}
      <ul className={`${constructorStyles.list} mt-25`}>
        {isIngredient(mainBun) && (
          <li className={`${constructorStyles.bun} ml-8 mr-4 mb-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${mainBun.name} (верх)`}
              price={mainBun.price}
              thumbnail={`${mainBun.image}`}
            />
          </li>
        )}
        {orderedIngredients.length > 0 && (
          <ul className={`${constructorStyles.list} constructorScroll mb-4`}>
            {orderedIngredients.map((ingredient, index) => {
              console.log(orderedIngredients);
              return (
                <ConstructorItem
                  key={index}
                  ingredient={ingredient}
                  index={index}
                  moveItem={moveItem}
                />
              );
            })}
          </ul>
        )}
        {isIngredient(mainBun) && (
          <li className={`${constructorStyles.bun} ml-8 mr-4 pt-4 bottom`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${mainBun.name} (низ)`}
              price={mainBun.price}
              thumbnail={`${mainBun.image}`}
            />
          </li>
        )}
      </ul>
      <OrderTotal
        totalIngredients={order.orderedIngredients}
        bun={mainBun}
        totalPrice={totalPrice}
      />
    </section>
  );
};

export default BurgerConstructor;
