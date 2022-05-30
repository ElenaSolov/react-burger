import React from "react";
import pageStyles from "./pages.module.css";
import OrderCard from "../components/orderCard/OrderCard";

function FeedPage() {
  const ordersDone = ["034533", "034532", "034531", "034530", "034529"];
  const ordersInprocess = ["034538", "034541", "034541"];
  return (
    <main className={pageStyles.main}>
      <div className={pageStyles.feedContent}>
        <h1 className={`${pageStyles.feedTitle} text text_type_main-large`}>
          Лента заказов
        </h1>
        <section className={pageStyles.orders}>
          <OrderCard
            number="034535"
            date="Сегодня, 16:20 i-GMT+3"
            name="Death Star Starship Main бургер"
            ingredients={[
              "60d3b41abdacab0026a733c7",
              "60d3b41abdacab0026a733ce",
              "60d3b41abdacab0026a733ca",
            ]}
            price={480}
          />
          <OrderCard
            number="034534"
            date="Сегодня, 13:20 i-GMT+3"
            name="Interstellar бургер"
            ingredients={[
              "60d3b41abdacab0026a733c7",
              "60d3b41abdacab0026a733d4",
              "60d3b41abdacab0026a733d3",
              "60d3b41abdacab0026a733c9",
              "60d3b41abdacab0026a733c8",
              "60d3b41abdacab0026a733cc",
              "60d3b41abdacab0026a733ce",
            ]}
            price={560}
          />
        </section>
        <section className={`${pageStyles.info} ml-15`}>
          <div className={pageStyles.table}>
            <div className={pageStyles.tableColumn}>
              <p className="text text_type_main-medium mt-16px">Готовы:</p>
              <ul className={pageStyles.list}>
                {ordersDone.map((num) => (
                  <li
                    className={`${pageStyles.done} ${pageStyles.item} mt-2 text text_type_digits-default`}
                  >
                    {num}
                  </li>
                ))}
              </ul>
            </div>

            <div className={pageStyles.tableColumn}>
              <p className="text text_type_main-medium mt-16px">В работе:</p>
              <ul className={pageStyles.list}>
                {ordersInprocess.map((num) => (
                  <li
                    className={`${pageStyles.item} mt-2 text text_type_digits-default`}
                  >
                    {num}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">28 752</p>
          <p className="text text_type_main-medium mt-15">
            Выполнено за все сегодня:
          </p>
          <p className="text text_type_digits-large">138</p>
        </section>
      </div>
    </main>
  );
}

export default FeedPage;
