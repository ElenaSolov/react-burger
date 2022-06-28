import { AppDispatch } from "../store.js";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_USER_NAME_UPDATE: "WS_USER_NAME_UPDATE" = "WS_USER_NAME_UPDATE";

// TS Interfaces
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface ICloseConnection {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: object;
}
export type TWsActions =
  | IWsConnectionSuccess
  | IWsGetMessage
  | ICloseConnection
  | IWsConnectionError;

//Action creators
export const startConnection = (wsUrl: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: WS_CONNECTION_START,
      payload: { wsUrl },
    });
  };
};

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const closeConnection = (): ICloseConnection => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message: object): IWsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};
