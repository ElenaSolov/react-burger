import {
  getUserInfo,
  sendAuthRequest,
  sendLoginRequest,
  sendResetPasswordRequest,
  sendLogoutRequest,
  sendUserUpdate,
  sendRestorePasswordRequest,
  refreshToken,
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/utils";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";
export const LOGOUT = "LOGOUT";
export const RESTORE_USER_EMAIL_SUCCESS = "RESTORE_USER_EMAIL_SUCCESS";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const AUTH_CHECKED = "AUTH_CHECKED";

export function register(email, password, name) {
  return function (dispatch) {
    sendAuthRequest(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            email: res.user.email,
            name: res.user.name,
          });
          setCookie("accessToken", res.accessToken);
          setCookie("refreshToken", res.refreshToken);
        }
      })
      .catch((err) => {
        dispatch({ type: REGISTER_FAIL });
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: AUTH_CHECKED });
      });
  };
}
export function login(email, password) {
  return function (dispatch) {
    sendLoginRequest(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            email: res.user.email,
            name: res.user.name,
            accessToken: res.accessToken,
          });
          setCookie("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken);
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAIL });
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: AUTH_CHECKED });
      });
  };
}
export function getUser() {
  return function (dispatch) {
    getUserInfo()
      .then((res) => {
        if (res && res.success) {
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
      })
      .finally(() => {
        dispatch({ type: AUTH_CHECKED });
      });
  };
}
export function restorePassword(email) {
  return function (dispatch) {
    sendRestorePasswordRequest(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESTORE_USER_EMAIL_SUCCESS,
            email: email,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function resetPassword(password, token) {
  return function (dispatch) {
    sendResetPasswordRequest(password, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
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
  return function (dispatch) {
    sendUserUpdate(name, email, password)
      .then(() => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          name,
          email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
