import React from "react";
import orderCardStyles from "./orderCard.module.css";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const OrderCard = ({ id, date, name, ingredients, price, status }) => {
  const ingredientsArray = useSelector(
    (store) => store.ingredients.ingredients
  );
  return (
    <Link to={id} className={orderCardStyles.link}>
      <article className={orderCardStyles.order}>
        <div className={orderCardStyles.header}>
          <p className="text text_type_digits-default">#{id}</p>
          <p className="text text_type_main-default text_color_inactive">
            {date}
          </p>
        </div>
        <h3 className="text text_type_main-medium">{name}</h3>
        {status && <p>{status}</p>}
        <div className={orderCardStyles.header}>
          <ul className={orderCardStyles.list}>
            {ingredients.map((ing, ind) => {
              const ingredient = ingredientsArray.find((i) => i._id === ing);
              if (ind === 5) {
                const rest = ingredients.length - 6;
                return (
                  <li key={ind} className={orderCardStyles.item}>
                    <span
                      className={`${orderCardStyles.rest} text text_type_main-default`}
                    >
                      +{rest}
                    </span>
                    <img
                      src={ingredient.image}
                      alt="ingredient.name"
                      className={orderCardStyles.img}
                    />
                  </li>
                );
              }
              if (ind > 5) return null;
              return (
                <li key={ind} className={orderCardStyles.item}>
                  <img
                    src={ingredient.image}
                    alt="ingredient.name"
                    className={orderCardStyles.img}
                  />
                </li>
              );
            })}
          </ul>
          <div
            className={`${orderCardStyles.price} text text_type_digits-default`}
          >
            {price}
            <span className="ml-2 mt-1">
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default OrderCard;
