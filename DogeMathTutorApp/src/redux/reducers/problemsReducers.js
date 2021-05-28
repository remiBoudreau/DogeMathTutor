import {
  SET_ALL_PROBLEMS,
  ADD_ANSWER,
  DELETE_ANSWER,
} from "../actions/problemsActions";

const initState = [];

const problemsReducers = (state = initState, action) => {
  if (action.type === SET_ALL_PROBLEMS) {
    for (let i = 0; i < action.payload.length; i++) {
      if (typeof action.payload[i].solved === "undefined") {
        action.payload[i].solved = false;
      }
    }

    // No data is found on local machine so create data
    if (state.length === 0) {
      return action.payload;
    } else {
      // Merge data from api call and local state for solved problems
      const mergedState = state.map((t1) => ({
        ...t1,
        ...action.payload.find((t2) => t2.id === t1.id),
      }));
      return mergedState;
    }
  }

  // Mark problem as solved
  if (action.type === ADD_ANSWER) {
    const id = action.payload;

    const updatedState = state.map((problem) => {
      if (problem.id === id) {
        problem.solved = true;
      }
      return problem;
    });
    return updatedState;
  }

  // Mark problem as unsolved
  if (action.type === DELETE_ANSWER) {
    const id = action.payload;

    const updatedState = state.map((problem) => {
      if (problem.id === id) {
        problem.solved = false;
      }
      return problem;
    });
    return updatedState;
  }

  return state;
};

export default problemsReducers;
