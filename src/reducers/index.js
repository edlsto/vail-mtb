import { combineReducers } from "redux";
import { trails } from "./trails";
import { favorites } from "./favorites";

export const rootReducer = combineReducers({
  trails,
  favorites,
});
