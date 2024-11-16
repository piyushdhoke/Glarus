
import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; 
import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";


const rootReducer = combineReducers({
  employee: employeeReducer,
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
