import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import orderFeedDetailsStyles from "./orderFeedDetails.module.css";
import { getDate, getOrderStatus } from "../../utils/utils";

const OrderFeedDetails = ({ order }) => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const orderIngredients = [];
  order.ingredients.forEach((ingredient) => {
    const index = orderIngredients.findIndex((el) => el._id === ingredient);
    return index >= 0
      ? orderIngredients[index].count++
      : orderIngredients.push({
          ...ingredients.find((i) => i._id === ingredient),
          count: 1,
        });
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
                  {ing.count}&nbsp;x
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
