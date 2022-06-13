import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/wsActions";

const initialState = {
  wsConnected: false,
  orders: [],
};

export const wsReducer = (state = initialState, action) => {
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
      };

    case WS_CONNECTION_CLOSED:
      console.log("closed");
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      console.log(action);

      return {
        ...state,
        orders: [...action.payload],
      };

    default:
      return state;
  }
};
