import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SET_CURRENT_TAB,
} from "../actions/actions";

const initialState = {
  ingredients: [],
  currentTab: "Булки",
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsRequestStatus: false,
};
export const ingredientsReducer = (state = initialState, action) => {
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
        ingredientsRequestStatus: "success",
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsRequestStatus: "failed",
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
