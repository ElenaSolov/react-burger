import {
  DECREASE_INGREDIENT,
  DELETE_FROM_ORDER, MOVE_INGREDIENT,
  ORDER_BUN,
  ORDER_INGREDIENT,
  SEND_ORDER_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS
} from "../actions/actions";

const initialState = {
  totalPrice: 0,
  orderedIngredients: [],
  orderedBun:{},
  orderRequest: false,
  orderFailed: false,
  orderStatus: false,
  orderNum: null,
  orders: []
}
export const orderReducer = (state=initialState, action) => {
  switch (action.type) {
    case ORDER_BUN: {
      return{
        ...state, orderedBun: action.ingredient
      }
    }
    case ORDER_INGREDIENT: {
      return {
        ...state,
         orderedIngredients: [...state.orderedIngredients, action.ingredient]
        }
    }
    case SEND_ORDER_REQUEST: {
      return{
        ...state,
         orderRequest: true, orderedIngredients: action.ingredients
      }
    }
    case SEND_ORDER_SUCCESS:{
      const newOrder = {...state, orderRequest: false, orderFailed: false, orderStatus: 'success', orderNum: action.res.order.number, totalPrice: action.totalPrice}
      return {
        ...initialState,
        orders: [...state.orders, newOrder]
      }
    }
    case SEND_ORDER_FAILED: {
      return{
        ...state,
         orderRequest: false, orderFailed: true, orderStatus: 'failed', orderedIngredients: []
      }
    }
    case DELETE_FROM_ORDER: {
      return {
        ...state,
          orderedIngredients: state.orderedIngredients.filter(i=> i._id !== action.ingredient._id)
        }
    }
    case DECREASE_INGREDIENT: {
      state.orderedIngredients.splice(action.index, 1);
      return {
        ...state,
         orderedIngredients: [...state.orderedIngredients]
        }
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        orderedIngredients: action.updatedIngredients
      }
    }
    default: { return state}
  }
  
}