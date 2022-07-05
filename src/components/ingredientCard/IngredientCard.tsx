import React, { FC } from "react";
import { useSelector } from "../../services/hooks";
import ingredientCardStyles from "./ingredientCard.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from "../../services/types/data";

interface IIngredientCardProps {
  ingredient: IIngredient;
}
const IngredientCard: FC<IIngredientCardProps> = ({ ingredient }) => {
  const id = ingredient._id;
  const location = useLocation();

  let count = useSelector(
    (store) =>
      store.order.orderedIngredients.filter((ing) => ing._id === ingredient._id)
        .length
  );

  function isNotEmpty(obj: IIngredient | object): obj is IIngredient {
    return "price" in obj;
  }
  const mainBun = useSelector((store) => store.order.orderedBun);
  if (isNotEmpty(mainBun) && ingredient._id === mainBun._id) {
    count = 2;
  }

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient, start: "ingredientCard" },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <li ref={dragRef}>
      <Link
        to={`ingredients/${id}`}
        className={`${ingredientCardStyles.card} mt-6 ml-4 mr-4 mb-10 id={id}`}
        state={{ background: location }}
      >
        <Counter count={count} />
        <img
          className={`${ingredientCardStyles.img} ml-4 mr-4`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <p
          className={`${ingredientCardStyles.price} mt-4 text text_type_digits-default`}
        >
          {ingredient.price}
          <span className={ingredientCardStyles.priceIcon}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <p
          className={`${ingredientCardStyles.text} mt-4 text text_type_main-default`}
        >
          {ingredient.name}
        </p>
        <button
          type="button"
          className={`${ingredientCardStyles.btn} text text_type_main-default`}
        >
          Добавить
        </button>
      </Link>
    </li>
  );
};

export default IngredientCard;
