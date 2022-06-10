import React from "react";
import orderCardStyles from "./orderCard.module.css";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { getDate } from "../../utils/utils";

const OrderCard = ({ order }) => {
  console.log(order);
  const ingredientsArray = useSelector(
    (store) => store.ingredients.ingredients
  );
  const price = order.ingredients.reduce((prev, next) => {
    console.log(prev, next);
    if (!next) return prev;
    const ingredient = ingredientsArray.find((ing) => {
      return next === ing._id;
    });
    console.log(prev, ingredient.price);
    return prev + ingredient.price;
  }, 0);
  const date = getDate(order.createdAt);
  const status =
    order.status === "done"
      ? {
          text: "Выполнен",
          className: `${orderCardStyles.done} text text_type_main-default`,
        }
      : { text: "Готовится", className: "text text_type_main-default" };

  return (
    <Link to={order.number} className={orderCardStyles.link}>
      <article className={orderCardStyles.order}>
        <div className={orderCardStyles.header}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {date}
          </p>
        </div>
        <h3 className="text text_type_main-medium">{order.name}</h3>
        {order.status && <p className={status.className}>{status.text}</p>}
        <div className={orderCardStyles.header}>
          <ul className={orderCardStyles.list}>
            {order.ingredients.map((ing, ind) => {
              const ingredient = ingredientsArray.find((i) => i._id === ing);
              console.log(ind, ingredient);
              if (ind === 5) {
                const rest = order.ingredients.length - 6;
                return (
                  <li key={ind} className={orderCardStyles.item}>
                    <span
                      className={`${orderCardStyles.rest} text text_type_main-default`}
                    >
                      +{rest}
                    </span>
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className={orderCardStyles.img}
                    />
                  </li>
                );
              }
              if (ind > 5) return null;
              return (
                ingredient && (
                  <li key={ind} className={orderCardStyles.item}>
                    {console.log(ind, ingredient)}
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className={orderCardStyles.img}
                    />
                  </li>
                )
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
