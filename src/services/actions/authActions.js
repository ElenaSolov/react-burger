import { sendAuthRequest, sendLoginRequest } from "../../utils/api";
import { setCookie } from "../../utils/utils";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export function register(email, password, name) {
  return function (dispatch) {
    sendAuthRequest(email, password, name)
      .then((res) => {
        if (res && res.success) {
          console.log("res", res);
          dispatch({
            type: REGISTER_SUCCESS,
            email: res.user.email,
            name: res.user.name,
            accessToken: res.accessToken.split("Bearer ")[1],
          });
          setCookie("token", res.refreshToken);
        }
      })
      .catch((err) => {
        dispatch({ type: REGISTER_FAIL });
        console.log(err);
      });
  };
}
export function login(email, password) {
  return function (dispatch) {
    sendLoginRequest(email, password)
      .then((res) => {
        if (res && res.success) {
          console.log("res", res);
          dispatch({
            type: LOGIN_SUCCESS,
            email: res.user.email,
            name: res.user.name,
            accessToken: res.accessToken.split("Bearer ")[1],
          });
          setCookie("token", res.refreshToken);
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAIL });
        console.log(err);
      });
  };
}
