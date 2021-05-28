import { GET_GRADE, CHANGE_GRADE } from "../actions/gradeActions";

const initState = 0;

const gradeReducers = (state = initState, action) => {
  // Update grade state from last saved
  if (action.type === GET_GRADE) {
    return state;
  }

  // Change grade state
  if (action.type === CHANGE_GRADE) {
    return action.payload;
  }

  return state;
};

export default gradeReducers;
