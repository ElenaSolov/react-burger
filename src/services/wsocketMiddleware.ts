import { getCookie } from "../utils/utils";
import { IWsActions } from "./store";
import type { Middleware, MiddlewareAPI } from "redux";

interface IWsURLS {
  all: string;
  orders: string;
}
const wsURLS: IWsURLS = {
  all: "wss://norma.nomoreparties.space/orders/all",
  orders: "wss://norma.nomoreparties.space/orders",
};

export const socketMiddleware = (wsActions: IWsActions): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        const wsUrl =
          payload === "orders"
            ? wsURLS["orders"] +
              `?token=${getCookie("accessToken").split("Bearer ")[1]}`
            : wsURLS["all"];
        socket = new WebSocket(wsUrl);
      }
      if (socket != null) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { orders } = parsedData;

          dispatch({ type: onMessage, payload: orders });
        };

        socket.onclose = (event) => {
          if (socket != null) socket.close();
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
