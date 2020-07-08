import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import competitionReducer from "./competitions/competitionReducer";

const combinedReducers = {
  auth: authReducer,
  competition: competitionReducer
}

const reducers = combineReducers(combinedReducers)

export default reducers