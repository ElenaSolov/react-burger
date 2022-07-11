import React from "react";
import { useSelector } from "react-redux";
import ingredientCardStyles from "./ingredientCard.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import propTypesConfig from "../../utils/propTypesConfig";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

const IngredientCard = ({ ingredient }) => {
  const id = ingredient._id;
  const location = useLocation();

  let count = useSelector(
    (store) =>
      store.order.orderedIngredients.filter((ing) => ing._id === ingredient._id)
        .length
  );

  const mainBun = useSelector((store) => store.order.orderedBun);
  if (ingredient._id === mainBun._id) {
    count = 2;
  }

  const [ , dragRef] = useDrag({
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
          {count>0&&<Counter count={count}/>}
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

IngredientCard.propTypes = {
  ingredient: PropTypes.shape(propTypesConfig).isRequired,
};

export default IngredientCard;
