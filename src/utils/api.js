const baseURL = "https://norma.nomoreparties.space/api";
const headers = { "Content-Type": "application/json" };

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const sendRequest = (method, body = null, url = baseURL) => {
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
  const ids = ingredients.map((ingredient) => ingredient._id);
  const body = JSON.stringify({ ingredients: ids });
  return sendRequest("POST", body, `${baseURL}/orders`);
};

export const sendRestorePasswordRequest = (email) => {
  const body = JSON.stringify({ email: email });
  return sendRequest("POST", body, `${baseURL}/password-reset`);
};

export const sendResetPasswordRequest = (email) => {
  const body = JSON.stringify({ email: email });
  return sendRequest("POST", body, `${baseURL}/password-reset/reset`);
};
