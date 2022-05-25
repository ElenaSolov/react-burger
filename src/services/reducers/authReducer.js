import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  RESTORE_USER_EMAIL_SUCCESS,
  RESET_PASSWORD_SUCCESS,
} from "../actions/authActions";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  resetPassword: false,
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
    case RESTORE_USER_EMAIL_SUCCESS: {
      return {
        ...state,
        email: action.email,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword: true,
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
