import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modalActions";

const initialState = {
  open: false,
};
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        open: true,
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
