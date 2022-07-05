import {
  getIngredientsRequest,
  sendOrderRequest,
  sendOrderDetailsRequest,
} from "../../utils/api";
import {
  IIngredient,
  IGetIngredientsSuccessResponse,
  IGetOrderDetailsSuccessResponse,
  IOrderedIngredient,
} from "../types/data.js";
import { AppDispatch, AppThunk } from "../store.js";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
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
  readonly ingredient: IIngredient;
  readonly key: string;
}
export interface IDecreaseIngredient {
  readonly type: typeof DECREASE_INGREDIENT;
  readonly index: number;
}
export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly updatedIngredients: Array<IOrderedIngredient>;
}
export interface IOrderBun {
  readonly type: typeof ORDER_BUN;
  readonly ingredient: IIngredient;
}
export interface IDeleteFromOrder {
  readonly type: typeof DELETE_FROM_ORDER;
  readonly ingredient: IIngredient;
}
export interface ISetCurrentTab {
  readonly type: typeof SET_CURRENT_TAB;
  readonly currentTab: string;
}
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<IIngredient>;
}
interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly orderNum: number;
}
interface ISendOrderFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
}
interface IGetOrderDetailsRequest {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
  number: string;
}
interface IGetOrderDetailsSuccess {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  res: IGetOrderDetailsSuccessResponse;
}
interface IGetOrderDetailsFailed {
  readonly type: typeof GET_ORDER_DETAILS_FAILED;
}
export type TIngredientsActions =
  | IOrderIngredientAction
  | ISetCurrentTab
  | IDeleteFromOrder
  | IOrderBun
  | IMoveIngredient
  | IDecreaseIngredient
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | ISendOrderSuccessAction
  | ISendOrderFailedAction
  | IGetOrderDetailsRequest
  | IGetOrderDetailsSuccess
  | IGetOrderDetailsFailed;

export function orderIngredient(
  ingredient: IIngredient,
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
  updatedIngredients: Array<IOrderedIngredient>
): IMoveIngredient {
  return {
    type: MOVE_INGREDIENT,
    updatedIngredients,
  };
}
export function orderBun(ingredient: IIngredient): IOrderBun {
  return {
    type: ORDER_BUN,
    ingredient,
  };
}
export function deleteFromOrder(ingredient: IIngredient): IDeleteFromOrder {
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
function getIngredientsSuccessAction(
  ingredients: Array<IIngredient>
): IGetIngredientsSuccessAction {
  return { type: GET_INGREDIENTS_SUCCESS, ingredients };
}
function getIngredientsFailedAction(): IGetIngredientsFailedAction {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
}

function sendOrderSuccessAction(orderNum: number): ISendOrderSuccessAction {
  return { type: SEND_ORDER_SUCCESS, orderNum };
}
function sendOrderFailedAction(): ISendOrderFailedAction {
  return { type: SEND_ORDER_FAILED };
}
function getOrderDetailsRequestAction(number: string): IGetOrderDetailsRequest {
  return { type: GET_ORDER_DETAILS_REQUEST, number };
}
function getOrderDetailsSuccessAction(
  res: IGetOrderDetailsSuccessResponse
): IGetOrderDetailsSuccess {
  return { type: GET_ORDER_DETAILS_SUCCESS, res };
}
function getOrderDetailsFailedAction(): IGetOrderDetailsFailed {
  return { type: GET_ORDER_DETAILS_FAILED };
}
export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequestAction());
    getIngredientsRequest()
      .then((res: IGetIngredientsSuccessResponse) => {
        if (res && res.success) {
          console.log(res);
          dispatch(getIngredientsSuccessAction(res.data));
        }
      })
      .catch((err) => {
        dispatch(getIngredientsFailedAction());
        console.log(err);
      });
  };
};
export const sendOrder: AppThunk = (
  ingredients: Array<IIngredient>,
  openOrderModal: any,
  totalPrice: number,
  setDisabled
) => {
  return function (dispatch: AppDispatch) {
    sendOrderRequest(ingredients)
      .then((res) => {
        if (res && res.success) {
          dispatch(sendOrderSuccessAction(res.order.number));
          openOrderModal();
        }
      })
      .catch((err) => {
        dispatch(sendOrderFailedAction());
        console.log(err);
      })
      .finally(setDisabled(false));
  };
};
export const getOrderDetails: AppThunk = (number: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderDetailsRequestAction(number));
    sendOrderDetailsRequest(number)
      .then((res: IGetOrderDetailsSuccessResponse) => {
        console.log(res);
        dispatch(getOrderDetailsSuccessAction(res));
      })
      .catch((err) => {
        dispatch(getOrderDetailsFailedAction());
        console.log(err);
      });
  };
};
