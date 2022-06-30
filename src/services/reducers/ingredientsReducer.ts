import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SET_CURRENT_TAB,
  TIngredientsActions,
} from "../actions/actions";
import { TIngredient } from "../types/data";

interface IIngredientsState {
  ingredients: Array<TIngredient>;
  currentTab: string;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsRequestStatus: boolean;
}
const initialState: IIngredientsState = {
  ingredients: [],
  currentTab: "Булки",
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsRequestStatus: false,
};
export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsRequestStatus: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsRequestStatus: false,
      };
    }

    case SET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.currentTab,
      };
    }
    default: {
      return state;
    }
  }
};
