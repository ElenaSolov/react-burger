import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredientsReducer.js";
import { orderReducer } from "./orderReducer.ts";
import { authReducer } from "./authReducer.ts";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
  feed: wsReducer,
});
