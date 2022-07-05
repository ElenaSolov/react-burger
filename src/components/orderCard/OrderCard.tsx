import React, { FC } from "react";
import orderCardStyles from "./orderCard.module.css";
import { useSelector } from "../../services/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { getDate, getOrderStatus } from "../../utils/utils";
import { IOrder } from "../../services/types/data";

interface IOrderCard {
  order: IOrder;
}
const OrderCard: FC<IOrderCard> = ({ order }) => {
  const ingredientsArray = useSelector(
    (store) => store.ingredients.ingredients
  );
  const price = order.ingredients.reduce((prev: number, next) => {
    const ingredient = ingredientsArray.find((ing) => {
      return next === ing._id;
    });
    if (!ingredient) return prev;
    return prev + ingredient.price;
  }, 0);
  const date = getDate(order.createdAt);
  const status = getOrderStatus(order);

  const location = useLocation();
  const rest = order.ingredients.length - 6;

  return (
    <li>
      <Link
        to={`${order.number}`}
        state={{ order: order, status: status, background: location }}
        className={orderCardStyles.link}
      >
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
                if (ingredient !== undefined) {
                  if (ind === 5 && rest) {
                    return (
                      <li
                        key={ind}
                        className={`${orderCardStyles.item} ${orderCardStyles.itemLast}`}
                      >
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
                        <img
                          src={ingredient.image}
                          alt={ingredient.name}
                          className={orderCardStyles.img}
                        />
                      </li>
                    )
                  );
                }
                return null;
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
    </li>
  );
};

export default OrderCard;
