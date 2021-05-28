// Action Types
export const GET_GRADE = "SET_GRADE";
export const CHANGE_GRADE = "CHANGE_GRADE";

// Get grade from last saved
export const getGrade = () => {
  return (dispatch) => {
    dispatch({ type: GET_GRADE });
  };
};

// Change Grade
export const changeGrade = (grade) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_GRADE, payload: grade });
  };
};
