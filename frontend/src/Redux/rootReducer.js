import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import competitionReducer from "./competitions/competitionReducer";
import cartReducer from "./cart/cartReducer";

const combinedReducers = {
  auth: authReducer,
  competition: competitionReducer,
  cart: cartReducer
}

const reducers = combineReducers(combinedReducers)

export default reducers