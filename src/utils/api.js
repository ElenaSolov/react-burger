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
  }).then(getResponseData)
    .catch(err => console.log(err));
};

export const getIngredientsRequest = () => {
  return sendRequest("GET", null, `${baseURL}/ingredients` );
};

export const sendOrderRequest = (ingredients) => {
  const ids = ingredients.map((ingredient) => ingredient._id);
  const body = JSON.stringify({ ingredients: ids });
  return sendRequest("POST", body, `${baseURL}/orders`);
};
