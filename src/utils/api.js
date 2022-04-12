const baseURL = "https://norma.nomoreparties.space/api/ingredients";
const orderURL = "https://norma.nomoreparties.space/api/orders";
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

export const getIngredients = () => {
  return sendRequest("GET");
};

export const sendOrder = (ingredients) => {
  const ids = ingredients.map((ingredient) => ingredient._id);
  const body = JSON.stringify({ ingredients: ids });
  return sendRequest("POST", body, orderURL);
};
