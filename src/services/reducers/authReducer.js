import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/authActions";

const initialState = {
  isAuth: false,
  name: null,
  email: null,
  accessToken: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      console.log(action);
      return {
        ...state,
        isAuth: true,
        name: action.name,
        email: action.email,
        accessToken: action.accessToken,
      };
    }
    case REGISTER_FAIL:
    case LOGIN_FAIL: {
      console.log("f");
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
