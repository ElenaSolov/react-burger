import {
  getIngredientsRequest,
  sendOrderRequest,
  sendOrderDetailsRequest,
} from "../../utils/api";
import { TIngredient } from "../types/data.js";
import { AppDispatch, AppThunk } from "../store.js";

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

//TS Interfaces
export interface IOrderIngredientAction {
  readonly type: typeof ORDER_INGREDIENT;
  readonly ingredient: TIngredient;
  readonly key: string;
}
export interface IDecreaseIngredient {
  readonly type: typeof DECREASE_INGREDIENT;
  readonly index: number;
}
export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly updatedIngredients: Array<TIngredient>;
}
export interface IOrderBun {
  readonly type: typeof ORDER_BUN;
  readonly ingredient: TIngredient;
}
export interface IDeleteFromOrder {
  readonly type: typeof DELETE_FROM_ORDER;
  readonly ingredient: TIngredient;
}
export interface ISetCurrentTab {
  readonly type: typeof SET_CURRENT_TAB;
  readonly currentTab: string;
}
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export type TIngredientsActions =
  | IOrderIngredientAction
  | ISetCurrentTab
  | IDeleteFromOrder
  | IOrderBun
  | IMoveIngredient
  | IDecreaseIngredient
  | IGetIngredientsRequestAction;

export function orderIngredient(
  ingredient: TIngredient,
  key: string
): IOrderIngredientAction {
  return {
    type: ORDER_INGREDIENT,
    ingredient,
    key,
  };
}
export function decreaseIngredient(index: number): IDecreaseIngredient {
  return {
    type: DECREASE_INGREDIENT,
    index,
  };
}
export function moveIngredient(
  updatedIngredients: Array<TIngredient>
): IMoveIngredient {
  return {
    type: MOVE_INGREDIENT,
    updatedIngredients,
  };
}
export function orderBun(ingredient: TIngredient): IOrderBun {
  return {
    type: ORDER_BUN,
    ingredient,
  };
}
export function deleteFromOrder(ingredient: TIngredient): IDeleteFromOrder {
  return {
    type: DELETE_FROM_ORDER,
    ingredient,
  };
}

export function setCurrentTab(currentTab: string): ISetCurrentTab {
  return {
    type: SET_CURRENT_TAB,
    currentTab,
  };
}
function getIngredientsRequestAction(): IGetIngredientsRequestAction {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
}
export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequestAction());
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
};
export const sendOrder: AppThunk = (
  ingredients: Array<string>,
  openOrderModal: any,
  totalPrice: number
) => {
  return function (dispatch: AppDispatch) {
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
};
export const getOrderDetails: AppThunk = (number: string) => {
  return function (dispatch: AppDispatch) {
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
};
