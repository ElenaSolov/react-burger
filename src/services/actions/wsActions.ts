import { AppDispatch } from "../store.js";
import { IWsSuccessResponse, IOrder } from "../types/data";

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
interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
interface ICloseConnection {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: Array<IOrder>;
}
interface IStartConnection {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string | null;
}
export type TWsActions =
  | IWsConnectionSuccess
  | IWsGetMessage
  | ICloseConnection
  | IWsConnectionError
  | IStartConnection;

//Action creators
function createStartConnectionAction(
  token: string | null
): IStartConnection {
  return {
    type: WS_CONNECTION_START,
    payload: token,
  };
}
export const startConnection = (token: string | null) => {
  return function (dispatch: AppDispatch) {
    dispatch(createStartConnectionAction(token));
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

export const wsGetMessage = (message: IWsSuccessResponse): IWsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message.orders,
  };
};
