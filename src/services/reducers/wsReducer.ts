import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWsActions,
} from "../actions/wsActions";
import { IOrder } from "../types/data";

interface IWsState {
  wsConnected: boolean;
  wsError: boolean;
  orders: Array<IOrder>;
}
const initialState: IWsState = {
  wsConnected: false,
  wsError: false,
  orders: [],
};

export const wsReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: [...action.payload],
      };

    default:
      return state;
  }
};
