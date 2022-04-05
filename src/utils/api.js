const baseURL = "https://norma.nomoreparties.space/api/ingredients";

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
const sendRequest = (method, body = null) => {
  return fetch(`${baseURL}`, {
    method: method,
    body: body,
  }).then(getResponseData);
};
export const getIngredients = () => {
  return sendRequest("GET");
};
