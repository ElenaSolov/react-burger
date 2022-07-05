import { getCookie, setCookie } from "./utils";
import { IIngredient } from "../services/types/data";

const baseURL = "https://norma.nomoreparties.space/api";
const defaultHeaders: HeadersInit = new Headers();
defaultHeaders.set("Content-Type", "application/json");

const getResponseData = (res: Response) => {
  return res?.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const sendRequest = (
  method: string,
  body: string | null = null,
  url: string = baseURL,
  authorization: boolean
) => {
  const headers = defaultHeaders;
  if (authorization) {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      headers.set("authorization", accessToken);
    }
  }
  return fetch(`${url}`, {
    method: method,
    body: body,
    headers: headers,
  }).then(getResponseData);
};

const sendRequestWithRefresh = async (
  method: string,
  body: string | null = null,
  url: string
) => {
  try {
    const res = await sendRequest(method, body, url, true);
    return Promise.resolve(res);
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message === "jwt expired") {
        return refreshToken()
          .then((res) => {
            setCookie("accessToken", res.accessToken);
            setCookie("refreshToken", res.refreshToken);
            return sendRequest(method, body, url, true);
          })
          .catch((err) => console.log(err));
      }
    } else {
      return Promise.reject(err);
    }
  }
};
export const getIngredientsRequest = () => {
  return sendRequest("GET", null, `${baseURL}/ingredients`, false);
};

export const sendOrderRequest = (ingredients: Array<IIngredient>) => {
  const ids = ingredients.map((ingredient) => ingredient._id);
  const body = JSON.stringify({ ingredients: ids });
  return sendRequestWithRefresh("POST", body, `${baseURL}/orders`);
};

// auth

export const sendAuthRequest = (
  email: string,
  password: string,
  name: string
) => {
  const body = JSON.stringify({ email, password, name });
  return sendRequest("POST", body, `${baseURL}/auth/register`, false);
};
export const sendLoginRequest = (email: string, password: string) => {
  const body = JSON.stringify({ email, password });
  return sendRequest("POST", body, `${baseURL}/auth/login`, false);
};
export const getUserInfo = () => {
  return sendRequestWithRefresh("GET", null, `${baseURL}/auth/user`);
};
export const refreshToken = () => {
  const body = JSON.stringify({ token: getCookie("refreshToken") });
  return sendRequest("POST", body, `${baseURL}/auth/token`, false);
};
export const sendRestorePasswordRequest = (email: string) => {
  const body = JSON.stringify({ email });
  return sendRequest("POST", body, `${baseURL}/password-reset`, false);
};
export const sendResetPasswordRequest = (password: string, token: string) => {
  const body = JSON.stringify({
    password,
    token,
  });
  return sendRequest("POST", body, `${baseURL}/password-reset/reset`, false);
};
export const sendLogoutRequest = () => {
  const body = JSON.stringify({ token: getCookie("refreshToken") });
  return sendRequest("POST", body, `${baseURL}/auth/logout`, false);
};
export const sendUserUpdate = (
  name: string,
  email: string,
  password: string
) => {
  const body = JSON.stringify({ name, email, password });
  return sendRequestWithRefresh("PATCH", body, `${baseURL}/auth/user`);
};
export const sendOrderDetailsRequest = (number: string) => {
  return sendRequest("GET", null, `${baseURL}/orders/${number}`, false);
};
