import {
  getUserInfo,
  sendAuthRequest,
  sendLoginRequest,
  sendResetPasswordRequest,
  sendLogoutRequest,
  sendUserUpdate,
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/utils";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";
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
            accessToken: res.accessToken,
          });
          setCookie("refreshToken", res.refreshToken, 1200);
          setCookie("accessToken", res.accessToken, 1200);
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAIL });
        console.log(err);
      });
  };
}
export function getUser() {
  return function (dispatch) {
    getUserInfo()
      .then((res) => {
        if (res && res.success) {
          console.log("res", res);
          dispatch({
            type: UPDATE_USER_SUCCESS,
            email: res.user.email,
            name: res.user.name,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: UPDATE_USER_FAIL,
        });
      });
  };
}
export function resetPassword(password) {
  return function (dispatch) {
    sendResetPasswordRequest(password)
      .then((res) => {
        if (res && res.success) {
          console.log("res", res);
          dispatch({
            type: UPDATE_USER_SUCCESS,
            email: res.user.email,
            name: res.user.name,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function logout() {
  return function (dispatch) {
    sendLogoutRequest()
      .then(() => {
        dispatch({
          type: LOGOUT,
        });
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function updateUserInfo(name, email, password) {
  console.log(name, email, password);
  return function (dispatch) {
    console.log(33);
    sendUserUpdate(name, email, password)
      .then(() => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          name,
          email,
        });
        console.log(44);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
