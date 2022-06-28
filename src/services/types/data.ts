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
