// Action Types
export const SET_ALL_PROBLEMS = "SET_ALL_PROBLEMS";
export const ADD_ANSWER = "ADD_ANSWER";
export const DELETE_ANSWER = "DELETE_ANSWER";

//Set all problems
export const fetchAllProblems = () => {
  // GraphQL API Url
  const apiUrl = "https://zed-calculator.hasura.app/v1/graphql";
  return (dispatch) => {
    return fetch(apiUrl, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query getProblems {
          problems {
            id,
            topic,
            question,
            grades
          }
        }`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Format grades data from string "[...]" to array [...]
        data.data.problems.forEach((problem) => {
          problem.grades = JSON.parse(problem.grades);
        });
        // Add fakeAnswers to object; in real scenario, answers would come from database
        data.data.problems.forEach((problem) => {
          problem.answer = "such doge";
        });
        dispatch({ type: SET_ALL_PROBLEMS, payload: data.data.problems });
      })
      .catch((error) => console.error(error));
  };
};

//Add Answer
export const addAnswer = (id, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast(`Your answer is correct! Great work!`, {
        appearance: "success",
        autoDismiss: true,
      });
    }
    dispatch({ type: ADD_ANSWER, payload: id });
  };
};

//Delete Answer
export const deleteAnswer = (id, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast(`The question has been refreshed`, {
        appearance: "error",
        autoDismiss: false,
      });
    }
    dispatch({ type: DELETE_ANSWER, payload: id });
  };
};
