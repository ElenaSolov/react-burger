import {
  DECREASE_INGREDIENT,
  DELETE_FROM_ORDER,
  MOVE_INGREDIENT,
  ORDER_BUN,
  ORDER_INGREDIENT,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_SUCCESS,
  TIngredientsActions,
} from "../actions/actions";
import { IIngredient, TOrder, IOrderedIngredient } from "../types/data";

interface IOrderState {
  totalPrice: number;
  orderedIngredients: Array<IOrderedIngredient>;
  orderedBun: IIngredient | object;
  orderFailed: boolean;
  orderStatus: string;
  orderNum: null | number;
  order: TOrder | object;
}

const initialState: IOrderState = {
  totalPrice: 0,
  orderedIngredients: [],
  orderedBun: {},
  orderFailed: false,
  orderStatus: "",
  orderNum: null,
  order: {},
};

export const orderReducer = (
  state = initialState,
  action: TIngredientsActions
): IOrderState => {
  switch (action.type) {
    case ORDER_BUN: {
      return {
        ...state,
        orderedBun: action.ingredient,
      };
    }
    case ORDER_INGREDIENT: {
      console.log(state.orderedIngredients);
      const newIngredient = {
        ...action.ingredient,
        key: action.key,
        index: state.orderedIngredients.length,
      };
      return {
        ...state,
        orderedIngredients: [...state.orderedIngredients, newIngredient],
      };
    }

    case SEND_ORDER_SUCCESS: {
      return {
        ...initialState,
        orderNum: action.orderNum,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
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
