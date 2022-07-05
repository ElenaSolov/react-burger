export interface IIngredient {
  readonly name: string;
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly _id: string;
  readonly start?: string;
}
export interface IOrderedIngredient extends IIngredient {
  key: string;
  index: number;
}
export interface IOrderWithCount extends IIngredient {
  count: number;
}
export interface IOrder {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  owner?: IUserData & { createdAt: string };
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
  success: true;
}

export type TOrder = {
  readonly totalPrice: number;
  readonly ingredients: Array<IIngredient>;
};

export interface IGetOrderDetailsSuccessResponse {
  orders: Array<IOrder>;
  success: true;
}

export interface IGetIngredientsSuccessResponse {
  readonly success: boolean;
  readonly data: Array<IIngredient>;
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

//WS types
export interface IWsSuccessResponse {
  orders: Array<IOrder>;
  success: true;
  total: number;
  totalToday: number;
}
// location
export type TLocationState = {
  pathname: string;
  state: {
    background?: { pathname: string };
    order?: IOrder;
  };
};
