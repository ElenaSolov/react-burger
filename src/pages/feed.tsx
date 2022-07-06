import React, { useEffect } from "react";
import pageStyles from "./pages.module.css";
import OrderCard from "../components/orderCard/OrderCard";
import { useDispatch, useSelector } from "../services/hooks";
import {
  startConnection,
  closeConnection,
} from "../services/actions/wsActions";
import { addScroll } from "../utils/utils";

function FeedPage(): JSX.Element {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feed.orders);
  const isError = useSelector((store) => store.feed.wsError);

  useEffect(() => {
    if (orders.length > 2 && !isError) addScroll(".ordersScroll", ".bottom");
  }, [orders.length, isError]);

  useEffect(() => {
    dispatch(startConnection("all"));
    return () => {
      dispatch(closeConnection());
    };
  }, [dispatch]);

  const ordersDone =
    orders && orders.filter((order) => order.status === "done");
  const ordersInprocess =
    orders && orders.filter((order) => order.status === "pending");
  const doneToday = ordersDone.filter((order) => {
    const today = new Date().toJSON().slice(0, 10);
    return order.createdAt.slice(0, 10) === today;
  }).length;

  return (
    <main className={pageStyles.main}>
      <div className={pageStyles.feedContent}>
        {isError ? (
          <h1
            className={`${pageStyles.feedTitle} ${pageStyles.error} text text_type_main-large `}
          >
            Что-то пошло не так, попробуйте обновить страницу
          </h1>
        ) : (
          <>
            <h1 className={`${pageStyles.feedTitle} text text_type_main-large`}>
              Лента заказов
            </h1>
            <ul className={`${pageStyles.orders} ordersScroll`}>
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </ul>
            <section className={`${pageStyles.info} ml-15`}>
              <div className={pageStyles.table}>
                <div className={pageStyles.tableColumn}>
                  <p className="text text_type_main-medium mt-16px">Готовы:</p>
                  <ul className={pageStyles.list}>
                    {ordersDone &&
                      ordersDone.slice(0, 5).map((order) => (
                        <li
                          key={order._id}
                          className={`${pageStyles.done} ${pageStyles.item} mt-2 text text_type_digits-default`}
                        >
                          {order.number}
                        </li>
                      ))}
                  </ul>
                  <ul className={pageStyles.list}>
                    {ordersDone &&
                      ordersDone.slice(5, 10).map((order) => (
                        <li
                          key={order._id}
                          className={`${pageStyles.done} ${pageStyles.item} mt-2 text text_type_digits-default`}
                        >
                          {order.number}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className={pageStyles.tableColumn}>
                  <p className="text text_type_main-medium mt-16px">
                    В работе:
                  </p>
                  <ul className={pageStyles.list}>
                    {ordersInprocess &&
                      ordersInprocess.slice(0, 5).map((order) => (
                        <li
                          key={order._id}
                          className={`${pageStyles.item} mt-2 text text_type_digits-default`}
                        >
                          {order.number}
                        </li>
                      ))}
                  </ul>
                  <ul className={pageStyles.list}>
                    {ordersInprocess &&
                      ordersInprocess.slice(5, 10).map((order) => (
                        <li
                          key={order._id}
                          className={`${pageStyles.item} mt-2 text text_type_digits-default`}
                        >
                          {order.number}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <p className="text text_type_main-medium">
                Выполнено за все время:
              </p>
              <p className="text text_type_digits-large">{orders.length}</p>
              <p className="text text_type_main-medium mt-15">
                Выполнено за сегодня:
              </p>
              <p className="text text_type_digits-large">{doneToday}</p>
            </section>{" "}
          </>
        )}
      </div>
    </main>
  );
}

export default FeedPage;
