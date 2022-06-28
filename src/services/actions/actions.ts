import {
  getIngredientsRequest,
  sendOrderRequest,
  sendOrderDetailsRequest,
} from "../../utils/api";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
export const SEND_ORDER_REQUEST: "SEND_ORDER_REQUEST" = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS: "SEND_ORDER_SUCCESS" = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED: "SEND_ORDER_FAILED" = "SEND_ORDER_FAILED";
export const ORDER_INGREDIENT: "ORDER_INGREDIENT" = "ORDER_INGREDIENT";
export const DECREASE_INGREDIENT: "DECREASE_INGREDIENT" = "DECREASE_INGREDIENT";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const ORDER_BUN: "ORDER_BUN" = "ORDER_BUN";
export const DELETE_FROM_ORDER: "DELETE_FROM_ORDER" = "DELETE_FROM_ORDER";
export const SET_CURRENT_INGREDIENT: "SET_CURRENT_INGREDIENT" =
  "SET_CURRENT_INGREDIENT";
export const RESET_CURRENT_INGREDIENT: "RESET_CURRENT_INGREDIENT" =
  "RESET_CURRENT_INGREDIENT";
export const SET_CURRENT_TAB: "SET_CURRENT_TAB" = "SET_CURRENT_TAB";
export const GET_ORDER_DETAILS_REQUEST: "GET_ORDER_DETAILS_REQUEST" =
  "GET_ORDER_DETAILS_REQUEST";
export const GET_ORDER_DETAILS_SUCCESS: "GET_ORDER_DETAILS_SUCCESS" =
  "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED: "GET_ORDER_DETAILS_FAILED" =
  "GET_ORDER_DETAILS_FAILED";

export function orderIngredient(ingredient, key) {
  return {
    type: ORDER_INGREDIENT,
    ingredient,
    key,
  };
}
export function decreaseIngredient(index) {
  return {
    type: DECREASE_INGREDIENT,
    index,
  };
}
export function moveIngredient(updatedIngredients) {
  return {
    type: MOVE_INGREDIENT,
    updatedIngredients,
  };
}
export function orderBun(ingredient) {
  return {
    type: ORDER_BUN,
    ingredient,
  };
}
export function deleteFromOrder(ingredient) {
  return {
    type: DELETE_FROM_ORDER,
    ingredient,
  };
}

export function setCurrentTab(currentTab) {
  return {
    type: SET_CURRENT_TAB,
    currentTab,
  };
}
export function getIngredients() {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getIngredientsRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: res.data });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
        console.log(err);
      });
  };
}
export function sendOrder(ingredients, openOrderModal, totalPrice) {
  return function (dispatch) {
    dispatch({ type: SEND_ORDER_REQUEST, ingredients });
    sendOrderRequest(ingredients)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: SEND_ORDER_SUCCESS, res, totalPrice });
          openOrderModal();
        }
      })
      .catch((err) => {
        dispatch({ type: SEND_ORDER_FAILED });
        console.log(err);
      });
  };
}
export function getOrderDetails(number) {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST, number });
    sendOrderDetailsRequest(number)
      .then((res) => {
        dispatch({ type: GET_ORDER_DETAILS_SUCCESS, res });
      })
      .catch((err) => {
        dispatch({ type: GET_ORDER_DETAILS_FAILED });
        console.log(err);
      });
  };
}
