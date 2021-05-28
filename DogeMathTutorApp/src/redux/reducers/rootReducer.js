import { combineReducers } from "redux";
import problemsReducers from "./problemsReducers";
import gradeReducers from "./gradeReducers";

const rootReducer = combineReducers({
  allProblemsData: problemsReducers,
  gradeData: gradeReducers,
});

export default rootReducer;
