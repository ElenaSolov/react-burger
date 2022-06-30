import {
  getUserInfo,
  sendAuthRequest,
  sendLoginRequest,
  sendResetPasswordRequest,
  sendLogoutRequest,
  sendUserUpdate,
  sendRestorePasswordRequest,
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../store.js";
import {
  IUserData,
  IRegisterOrLoginSuccessResponse,
  IUpdateUserSuccessResponse,
} from "../types/data";

export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAIL: "REGISTER_FAIL" = "REGISTER_FAIL";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAIL: "LOGIN_FAIL" = "LOGIN_FAIL";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL: "UPDATE_USER_FAIL" = "UPDATE_USER_FAIL";
export const LOGOUT: "LOGOUT" = "LOGOUT";
export const RESTORE_USER_EMAIL_SUCCESS: "RESTORE_USER_EMAIL_SUCCESS" =
  "RESTORE_USER_EMAIL_SUCCESS";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const AUTH_CHECKED: "AUTH_CHECKED" = "AUTH_CHECKED";

//Action creators types
interface IRegisterSuccessAction extends IUserData {
  readonly type: typeof REGISTER_SUCCESS;
}
interface IRegisterFail {
  readonly type: typeof REGISTER_FAIL;
}
interface IAuthChecked {
  readonly type: typeof AUTH_CHECKED;
}
interface ILoginSuccess extends IUserData {
  readonly type: typeof LOGIN_SUCCESS;
}
interface ILoginFail {
  readonly type: typeof LOGIN_FAIL;
}
interface IUpdateUserSuccess extends IUserData {
  readonly type: typeof UPDATE_USER_SUCCESS;
}
interface IUpdateUserFail {
  readonly type: typeof UPDATE_USER_FAIL;
}
interface IRestoreUserEmailSuccess {
  readonly type: typeof RESTORE_USER_EMAIL_SUCCESS;
  email: string;
}
interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export type TAuthActions =
  | IRegisterSuccessAction
  | IRegisterFail
  | IAuthChecked
  | ILoginSuccess
  | ILoginFail
  | IUpdateUserSuccess
  | IUpdateUserFail
  | typeof LOGOUT
  | IRestoreUserEmailSuccess
  | IResetPasswordSuccess;

//action creators
function createRegisterSuccessAction(
  res: IRegisterOrLoginSuccessResponse
): IRegisterSuccessAction {
  return {
    type: REGISTER_SUCCESS,
    email: res.user.email,
    name: res.user.name,
  };
}
function createRegisterFailAction(): IRegisterFail {
  return { type: REGISTER_FAIL };
}
function createAuthCheckedAction(): IAuthChecked {
  return { type: AUTH_CHECKED };
}
function createLoginSuccessAction(
  res: IRegisterOrLoginSuccessResponse
): ILoginSuccess {
  return {
    type: LOGIN_SUCCESS,
    email: res.user.email,
    name: res.user.name,
  };
}
function createLoginFailAction(): ILoginFail {
  return { type: LOGIN_FAIL };
}
function createUpdateUserSuccessAction(
  res: IUpdateUserSuccessResponse
): IUpdateUserSuccess {
  return {
    type: UPDATE_USER_SUCCESS,
    email: res.user.email,
    name: res.user.name,
  };
}

function createUpdateUserFailAction(): IUpdateUserFail {
  return { type: UPDATE_USER_FAIL };
}
function createRestoreUserEmailSuccessAction(
  email: string
): IRestoreUserEmailSuccess {
  return {
    type: RESTORE_USER_EMAIL_SUCCESS,
    email,
  };
}
function createResetPasswordSuccessAction(): IResetPasswordSuccess {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
}
export const register: AppThunk = (
  email: string,
  password: string,
  name: string
) => {
  return function (dispatch: AppDispatch) {
    sendAuthRequest(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch(createRegisterSuccessAction(res));
          setCookie("accessToken", res.accessToken);
          setCookie("refreshToken", res.refreshToken);
        }
      })
      .catch((err) => {
        dispatch(createRegisterFailAction());
        console.log(err);
      })
      .finally(() => {
        dispatch(createAuthCheckedAction());
      });
  };
};
export const login: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    sendLoginRequest(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch(createLoginSuccessAction(res));
          setCookie("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken);
        }
      })
      .catch((err) => {
        dispatch(createLoginFailAction());
        console.log(err);
      })
      .finally(() => {
        dispatch(createAuthCheckedAction());
      });
  };
};
export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    getUserInfo()
      .then((res) => {
        if (res && res.success) {
          dispatch(createUpdateUserSuccessAction(res));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(createUpdateUserFailAction());
      })
      .finally(() => {
        dispatch(createAuthCheckedAction());
      });
  };
};
export const restorePassword: AppThunk = (email: string) => {
  console.log(email);
  return function (dispatch: AppDispatch) {
    sendRestorePasswordRequest(email)
      .then((res) => {
        if (res && res.success) {
          dispatch(createRestoreUserEmailSuccessAction(email));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const resetPassword: AppThunk = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    sendResetPasswordRequest(password, token)
      .then((res) => {
        if (res && res.success) {
          dispatch(createResetPasswordSuccessAction());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const logout: AppThunk = () => {
  return function (dispatch: AppDispatch) {
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
};
export const updateUserInfo: AppThunk = (
  name: string,
  email: string,
  password: string
) => {
  return function (dispatch: AppDispatch) {
    sendUserUpdate(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch(createUpdateUserSuccessAction(res));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
