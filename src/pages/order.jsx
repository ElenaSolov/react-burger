import React from "react";
import pagesStyles from "./pages.module.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderPage() {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const location = useLocation();

  const id = location.pathname.split("/")[2];
  const order = {
    id: "034535",
    date: "Сегодня, 16:20 i-GMT+3",
    name: "Death Star Starship Main бургер",
    ingredients: [
      "60d3b41abdacab0026a733c7",
      "60d3b41abdacab0026a733ce",
      "60d3b41abdacab0026a733ca",
    ],
  };

  console.log(id);
  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.orderContainer}>
        <p className="text text_type_digits-default mb-10">{id}</p>
        <h3
          className={`${pagesStyles.orderText} text text_type_main-medium mb-15`}
        >
          {order.name}
        </h3>
        <p className={`${pagesStyles.orderText} text text_type_main-medium`}>
          Состав:
        </p>
        <ul className={`${pagesStyles.list} mb-10`}>
          {order.ingredients.map((ing, ind) => {
            const ingredient = ingredients.find((i) => i._id === ing);
            return (
              <li key={ind} className={`${pagesStyles.ingredient} mb-4`}>
                <img
                  src={ingredient.image}
                  alt="ingredient.name"
                  className={`${pagesStyles.img} mr-4`}
                />
                <p className="text text_type_main-default mr-4">
                  {ingredient.name}
                </p>

                <div className={pagesStyles.price}>
                  <p className="text text_type_digits-default mr-2">count x</p>
                  <p className="text text_type_digits-default mr-2">price</p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={pagesStyles.orderTotalContainer}>
          <p className="text text_type_main-default text_color_inactive">
            {order.date}
          </p>
          <div className={pagesStyles.price}>
            <p className="text text_type_digits-default mr-2 ml-2">510</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderPage;
