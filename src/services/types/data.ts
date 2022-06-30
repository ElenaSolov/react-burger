export type TIngredient = {
  readonly name: string;
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly _id: string;
};
export type TOrder = {
  readonly totalPrice: number;
  readonly ingredients: Array<TIngredient>;
};
interface IOrder {
  createdAt: string;
  ingredients: Array<TIngredient>;
  name: string;
  number: number;
  owner: IUserData & { createdAt: string };
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
  success: true;
}

export interface ISendOrderSuccessResponse {
  success: boolean;
  name: string;
  order: IOrder;
}
export interface IGetOrderDetailsSuccessResponse {
  orders: Array<IOrder>;
  success: true;
}

export interface IGetIngredientsSuccessResponse {
  readonly success: boolean;
  readonly data: Array<TIngredient>;
}

//auth types
export interface IUserData {
  email: string;
  name: string;
}
export interface IUpdateUserSuccessResponse {
  success: true;
  user: IUserData;
}
export interface IRegisterOrLoginSuccessResponse
  extends IUpdateUserSuccessResponse {
  accessToken: string;
  refreshToken: string;
}
export interface IResetPasswordSuccessResponse {
  message: "Password successfully reset";
  success: true;
}