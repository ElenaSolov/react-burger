import { getCookie } from "../utils/utils";

const wsURLS = {
  all: "wss://norma.nomoreparties.space/orders/all",
  orders: "wss://norma.nomoreparties.space/orders",
};

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        console.log(payload);
        const wsUrl =
          payload.wsUrl === "orders"
            ? wsURLS[payload.wsUrl] +
              `?token=${getCookie("accessToken").split("Bearer ")[1]}`
            : wsURLS[payload.wsUrl];
        socket = new WebSocket(wsUrl);
        console.log(11);
      }
      if (socket) {
        console.log(22);
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, orders } = parsedData;

          dispatch({ type: onMessage, payload: orders });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
          socket.close();
        };
      }

      next(action);
    };
  };
};
