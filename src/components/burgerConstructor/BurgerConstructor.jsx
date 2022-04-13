import React, {useMemo} from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burgerConstructor.module.css";
import OrderTotal from "../orderTotal/OrderTotal";
import { IngredientsContext } from "../../services/appContext.js";

const orderTotalInitialState = { ingredients: [] };

function reducer(state, action) {
  switch (action.type) {
    case "increase":
      return {...state,
        ingredients: [...state.ingredients, action.ingredient],
      };
    case "decrease":
      if(state.ingredients.indexOf(action.ingredient)>=0) {
        return state.ingredients.filter(ing => ing._id !== action.ingredient._id)
      }
      return {...state};
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

  const mainBun = useMemo(
    ()=> ingredients.find((ingredient) => ingredient.name === "Краторная булка N-200i"),
    [ingredients]);
  const restIngredients = useMemo(
    ()=> ingredients.filter((ingredient) => ingredient.type !== "bun"),
    [ingredients]);
  const totalPrice = useMemo(
    ()=>{
      if(orderTotal.ingredients.length>0){
       return orderTotal.ingredients.reduce((prev, next) => prev+next.price, 0)
      };
      return 0;
    }
    , [orderTotal.ingredients]);

  React.useEffect(() => {
    orderTotalDispatcher({ type: "increase", ingredient: mainBun });
    restIngredients.forEach((ingredient) =>
      orderTotalDispatcher({ type: "increase", ingredient: ingredient })
    );

  }, [mainBun, restIngredients]);

  return (
    <section className={`${constructorStyles.constructor} pl-4`}>
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
      <OrderTotal totalIngredients={orderTotal.ingredients} totalPrice={totalPrice}  />
    </section>
  );
};

export default BurgerConstructor;
