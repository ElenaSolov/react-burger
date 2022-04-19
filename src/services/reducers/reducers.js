
import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  ADD_INGREDIENT,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
  SET_CURRENT_TAB
} from "../actions/actions";

const initialState = {
  ingredients: [],
  currentIngredient: null,
  currentTab: 'Булки',
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsRequestStatus: false,
  order: {
    totalPrice: 0,
    orderedIngredients: [],
    orderRequest: false,
    orderFailed: false,
    orderStatus: false,
    orderNum: null
  }
}
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state, ingredientsRequest:true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients:action.ingredients,
        ingredientsRequest: false,
        ingredientsRequestStatus: 'success',
        ingredientsFailed: false
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsRequestStatus: 'failed'
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        order: {
          ...state.order, orderedIngredients: [...state.order.orderedIngredients, action.ingredient]
        }
      }
    }
    case SEND_ORDER_REQUEST: {
      return{
        ...state,
        order: {...state.order, orderRequest: true, orderedIngredients: action.ingredients}
      }
    }
    case SEND_ORDER_SUCCESS:{
      console.log('success', action)
      return {
        ...state,
        order: {...state.order, orderRequest: false, orderFailed: false, orderStatus: 'success', orderNum: action.res.order.number}
      }
    }
    case SEND_ORDER_FAILED: {
      return{
        ...state,
        order:{...state.order, orderRequest: false, orderFailed: true, orderStatus: 'failed', orderedIngredients: []}
      }
    }
    case SET_CURRENT_INGREDIENT: {
      return{
        ...state, currentIngredient: action.ingredient
      }
    }
    case RESET_CURRENT_INGREDIENT: {
      return{
        ...state, currentIngredient: initialState.currentIngredient
      }
    }
    case SET_CURRENT_TAB:{
      return{
        ...state, currentTab: action.currentTab
      }
    }
    default: { return state}
  }
  
}