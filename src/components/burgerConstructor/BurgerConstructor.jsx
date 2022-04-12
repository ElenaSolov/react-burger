import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burgerConstructor.module.css";
import OrderTotal from "../orderTotal/OrderTotal";
import { IngredientsContext } from "../../services/appContext.js";

const orderTotalInitialState = { orderTotal: 0, ingredients: [] };

function reducer(state, action) {
  switch (action.type) {
    case "increase":
      return {
        orderTotal: state.orderTotal + action.ingredient.price,
        ingredients: [...state.ingredients, action.ingredient],
      };
    case "decrease":
      return { orderTotal: state.orderTotal - action.price };
    case "reset":
      return orderTotalInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = () => {
  const { ingredients } = React.useContext(IngredientsContext);
  const [orderTotal, orderTotalDispatcher] = React.useReducer(
    reducer,
    orderTotalInitialState
  );

  const mainBun = ingredients.find(
    (ingredient) => ingredient.name === "Краторная булка N-200i"
  );
  const restIngredients = ingredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  React.useEffect(() => {
    orderTotalDispatcher({ type: "increase", ingredient: mainBun });
    restIngredients.forEach((ingredient) =>
      orderTotalDispatcher({ type: "increase", ingredient: ingredient })
    );
  }, []);

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
          {restIngredients.map((ingredient) => {
            return (
              <li
                key={`${ingredient._id}`}
                className={`${constructorStyles.item} ml-8 mr-4 mb-4`}
              >
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
      <OrderTotal orderTotal={orderTotal} />
    </section>
  );
};

export default BurgerConstructor;
