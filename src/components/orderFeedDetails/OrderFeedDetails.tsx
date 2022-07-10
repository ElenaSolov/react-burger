import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks";
import orderFeedDetailsStyles from "./orderFeedDetails.module.css";
import { getDate, getOrderStatus } from "../../utils/utils";
import { IOrder, IOrderWithCount } from "../../services/types/data";
import { FC } from "react";

interface IOrderFeedDetails {
  order: IOrder;
}
const OrderFeedDetails: FC<IOrderFeedDetails> = ({ order }) => {
  console.log(order);
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  console.log(ingredients)
  const orderIngredients: Array<IOrderWithCount> = [];
  order.ingredients.forEach((ingredient) => {
    const index = orderIngredients.findIndex((el) => el._id === ingredient);
    return index > -1
      ? orderIngredients[index].count++
      : (() => {
          const ing = ingredients.find((i) => i._id === ingredient);
          if (typeof ing === 'undefined'){
              return;
          } else {
              orderIngredients.push({
                  ...ing,
                  count: 1,
              });
          }
        })();

  });
  const date = getDate(order.createdAt);
  const status = getOrderStatus(order);
  const totalPrice = orderIngredients.reduce(
    (prev, next) => prev + next.price * next.count,
    0
  );

  return (
    <div className={orderFeedDetailsStyles.orderContainer}>
      <p className="text text_type_digits-default mb-10">{order.number}</p>
      <h3
        className={`${orderFeedDetailsStyles.orderText} text text_type_main-medium mb-3`}
      >
        {order.name}
      </h3>
      <p
        className={`${status.className} ${orderFeedDetailsStyles.status} mb-15`}
      >
        {status.text}
      </p>
      <p
        className={`${orderFeedDetailsStyles.orderText} text text_type_main-medium mb-6`}
      >
        Состав:
      </p>
      <ul className={`${orderFeedDetailsStyles.list} mb-10`}>
        {orderIngredients.map((ing, ind) => {
          return (
            <li
              key={ind}
              className={`${orderFeedDetailsStyles.ingredient} mb-4`}
            >
              <img
                src={ing.image}
                alt="ingredient.name"
                className={`${orderFeedDetailsStyles.img} mr-4`}
              />
              <p className="text text_type_main-default mr-4">{ing.name}</p>

              <div className={orderFeedDetailsStyles.total}>
                <p className="text text_type_digits-default mr-2">
                  {ing.count} x
                </p>
                <p className="text text_type_digits-default mr-2">
                  {ing.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={orderFeedDetailsStyles.orderTotalContainer}>
        <p className="text text_type_main-default text_color_inactive">
          {date}
        </p>
        <div className={orderFeedDetailsStyles.total}>
          <p className="text text_type_digits-default mr-2 ml-2">
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFeedDetails;
