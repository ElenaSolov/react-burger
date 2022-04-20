import {getIngredientsRequest, sendOrderRequest} from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const ORDER_INGREDIENT = 'ORDER_INGREDIENT';
export const ORDER_BUN = 'ORDER_BUN';
export const DELETE_FROM_ORDER = 'DELETE_FROM_ORDER';
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const RESET_CURRENT_INGREDIENT = 'RESET_CURRENT_INGREDIENT';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';


export function getIngredients(){
  return function (dispatch){
    dispatch({type: GET_INGREDIENTS_REQUEST});
    getIngredientsRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({type:GET_INGREDIENTS_SUCCESS, ingredients: res.data });
        } else {
          dispatch({type: GET_INGREDIENTS_FAILED})
        }
    })
  }
}
export function sendOrder(ingredients, openModal){
  return function(dispatch){
    dispatch({type: SEND_ORDER_REQUEST, ingredients});
    sendOrderRequest(ingredients)
      .then(res => {
        if(res && res.success){
          dispatch({type:SEND_ORDER_SUCCESS, res})
          openModal(true);
        } else {
          dispatch({SEND_ORDER_FAILED});
          console.log("Ощибка")
        }
      })
  }
}