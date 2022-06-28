import { getCookie, setCookie } from "./utils";

const baseURL = "https://norma.nomoreparties.space/api";
const defaultHeaders = { "Content-Type": "application/json" };

const getResponseData = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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

const sendRequestWithRefresh = async (method, body = null, url, options) => {
  try {
    const res = await sendRequest(method, body, url, options);
    return Promise.resolve(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      return refreshToken()
        .then((res) => {
          setCookie("accessToken", res.accessToken);
          setCookie("refreshToken", res.refreshToken);
          options.authorization = res.accessToken;
          return sendRequest(method, body, url, options);
        })
        .catch((err) => console.log(err));
    } else {
      return Promise.reject(err);
    }
  }
};
export const getIngredientsRequest = () => {
  return sendRequest("GET", null, `${baseURL}/ingredients`);
};

export const sendOrderRequest = (ingredients) => {
  const headers = { authorization: getCookie("accessToken") };
  const ids = ingredients.map((ingredient) => ingredient._id);
  const body = JSON.stringify({ ingredients: ids });
  return sendRequestWithRefresh("POST", body, `${baseURL}/orders`, headers);
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
  return sendRequestWithRefresh("GET", null, `${baseURL}/auth/user`, headers);
};
export const refreshToken = () => {
  const body = JSON.stringify({ token: getCookie("refreshToken") });
  return sendRequest("POST", body, `${baseURL}/auth/token`);
};
export const sendRestorePasswordRequest = (email) => {
  const body = JSON.stringify({ email });
  return sendRequest("POST", body, `${baseURL}/password-reset`);
};
export const sendResetPasswordRequest = (password, token) => {
  const body = JSON.stringify({
    password,
    token,
  });
  return sendRequest("POST", body, `${baseURL}/password-reset/reset`);
};
export const sendLogoutRequest = () => {
  const body = JSON.stringify({ token: getCookie("refreshToken") });
  return sendRequest("POST", body, `${baseURL}/auth/logout`);
};
export const sendUserUpdate = (name, email, password) => {
  const headers = { authorization: getCookie("accessToken") };
  const body = JSON.stringify({ name, email, password });
  return sendRequestWithRefresh("PATCH", body, `${baseURL}/auth/user`, headers);
};
export const sendOrderDetailsRequest = (number) => {
  return sendRequest("GET", null, `${baseURL}/orders/${number}`);
};
