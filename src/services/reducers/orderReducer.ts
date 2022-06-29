import {
  DECREASE_INGREDIENT,
  DELETE_FROM_ORDER,
  MOVE_INGREDIENT,
  ORDER_BUN,
  ORDER_INGREDIENT,
  SEND_ORDER_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_SUCCESS,
  TIngredientsActions,
} from "../actions/actions";
import { TIngredient, TOrder } from "../types/data";

interface IOrderState {
  totalPrice: number;
  orderedIngredients: Array<TIngredient>;
  orderedBun: TIngredient | object;
  orderRequest: boolean;
  orderFailed: boolean;
  orderStatus: boolean;
  orderNum: null | number;
  orders: Array<TOrder>;
  order: TOrder | object;
}
const initialState: IOrderState = {
  totalPrice: 0,
  orderedIngredients: [],
  orderedBun: {},
  orderRequest: false,
  orderFailed: false,
  orderStatus: false,
  orderNum: null,
  orders: [],
  order: {},
};
export const orderReducer = (
  state = initialState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case ORDER_BUN: {
      return {
        ...state,
        orderedBun: action.ingredient,
      };
    }
    case ORDER_INGREDIENT: {
      return {
        ...state,
        orderedIngredients: [...state.orderedIngredients, action.ingredient],
      };
    }
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderedIngredients: action.ingredients,
      };
    }
    case SEND_ORDER_SUCCESS: {
      const newOrder = {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderStatus: "success",
        orderNum: action.res.order.number,
        totalPrice: action.totalPrice,
      };
      return {
        ...initialState,
        orders: [...state.orders, newOrder],
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        orderStatus: "failed",
        orderedIngredients: [],
      };
    }
    case DELETE_FROM_ORDER: {
      return {
        ...state,
        orderedIngredients: state.orderedIngredients.filter(
          (i) => i._id !== action.ingredient._id
        ),
      };
    }
    case DECREASE_INGREDIENT: {
      state.orderedIngredients.splice(action.index, 1);
      return {
        ...state,
        orderedIngredients: [...state.orderedIngredients],
      };
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        orderedIngredients: action.updatedIngredients,
      };
    }
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderFailed: true,
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        order: action.res.orders[0],
      };
    }
    default: {
      return state;
    }
  }
};
