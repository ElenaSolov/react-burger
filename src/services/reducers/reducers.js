import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducer.js";
import { orderReducer } from "./orderReducer.js";
import { authReducer } from "./authReducer.js";
import { modalReducer } from "./modalReducer.js";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
  modal: modalReducer,
});
