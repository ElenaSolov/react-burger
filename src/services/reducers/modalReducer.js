import {
  OPEN_INGREDIENT_MODAL,
  OPEN_ORDER_MODAL,
  CLOSE_MODAL,
} from "../actions/modalActions";

const initialState = {
  openIngredientModal: false,
  openOrderModal: false,
};
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...initialState,
        openIngredientModal: true,
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...initialState,
        openOrderModal: true,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
