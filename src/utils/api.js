import { getCookie } from "./utils";

const baseURL = "https://norma.nomoreparties.space/api";
const defaultHeaders = { "Content-Type": "application/json" };

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const sendRequest = (method, body = null, url = baseURL, additionalHeaders) => {
  const headers = additionalHeaders
    ? { ...defaultHeaders, ...additionalHeaders }
    : defaultHeaders;
  return fetch(`${url}`, {
    method: method,
    body: body,
    headers: headers,
  }).then(getResponseData);
};

export const getIngredientsRequest = () => {
  return sendRequest("GET", null, `${baseURL}/ingredients`);
};

export const sendOrderRequest = (ingredients) => {
  const headers = { authorization: getCookie("accessToken") };
  const ids = ingredients.map((ingredient) => ingredient._id);
  const body = JSON.stringify({ ingredients: ids });
  return sendRequest("POST", body, `${baseURL}/orders`, headers);
};

// auth

export const sendAuthRequest = (email, password, name) => {
  const body = JSON.stringify({ email, password, name });
  return sendRequest("POST", body, `${baseURL}/auth/register`);
};
export const sendLoginRequest = (email, password) => {
  const body = JSON.stringify({ email, password });
  return sendRequest("POST", body, `${baseURL}/auth/login`);
};
export const getUserInfo = () => {
  const headers = { authorization: getCookie("accessToken") };
  return sendRequest("GET", null, `${baseURL}/auth/user`, headers);
};
export const refreshCookie = () => {
  const body = JSON.stringify({ token: getCookie("refreshToken") });
  return sendRequest("POST", body, `${baseURL}/auth/token`);
};
export const sendRestorePasswordRequest = (email) => {
  const body = JSON.stringify({ email: email });
  return sendRequest("POST", body, `${baseURL}/password-reset`);
};
export const sendResetPasswordRequest = (password) => {
  const headers = { authorization: getCookie("accessToken") };
  const body = JSON.stringify({
    password: password,
    token: getCookie("accessToken"),
  });
  return sendRequest("POST", body, `${baseURL}/password-reset/reset`, headers);
};
export const sendLogoutRequest = () => {
  const body = JSON.stringify({ token: getCookie("refreshToken") });
  return sendRequest("POST", body, `${baseURL}/auth/logout`);
};
export const sendUserUpdate = (name, email, password) => {
  const headers = { authorization: getCookie("accessToken") };
  const body = JSON.stringify({ name, email, password });
  return sendRequest("PATCH", body, `${baseURL}/auth/user`, headers);
};
