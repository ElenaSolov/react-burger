import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../actions/authActions";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        name: action.name,
        email: action.email,
      };
    }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case UPDATE_USER_FAIL:
    case LOGOUT: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
