import { combineReducers } from "redux";
import userdetails from "./userdetails";
import loginstatus from "./loginstatus";
const components = combineReducers({
  userDetails: userdetails,
  islogged: loginstatus,
});

export default components;
