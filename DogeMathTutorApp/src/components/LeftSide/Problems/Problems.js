// React
import { useEffect, useRef, useState } from "react";
// Custom Hooks
import useWindowDimensions from "../../../hooks/useWindowDimensions";
//Redux
import { connect, useDispatch } from "react-redux";
import {
  addAnswer,
  deleteAnswer,
} from "../../../redux/actions/problemsActions";
// Material UI Components
import { Paper, TextField, Button } from "@material-ui/core";
// Material UI Icons
import {
  Check,
  NavigateBefore,
  NavigateNext,
  Replay,
} from "@material-ui/icons";
// Toasts
import { useToasts } from "react-toast-notifications";
// CSS Styles
import "./Problems.css";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "./ProblemsMuiStyles";
const useStyles = makeStyles(styles);

const Problems = ({
  problems,
  setCorrect,
  setTextFocus,
  indicator,
  setIndicator,
  isMobile,
  overlay,
  setOverlay,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [focusProblem, setFocusProblem] = useState(0);

  // Create answer object from problems of current grade
  const answer = useRef(
    problems.map((problem) => {
      if (problem.solved) {
        return problem.answer;
      } else {
        return "";
      }
    })
  );

  // Get height
  const { height } = useWindowDimensions();

  // Prevent Touch Scrolling when on mobile and onFocus in input; glitchy behaviour due to material ui
  useEffect(() => {
    function handleTouch(event) {
      if (overlay) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
    window.addEventListener("touchmove", handleTouch, { passive: false });
    return () => {
      window.removeEventListener("touchmove", handleTouch, { passive: false });
    };
  });

  // Remove scroll indicator after container has been scrolled
  useEffect(() => {
    function getScrollPosition(event) {
      if (
        document.getElementById("problems-container").scrollTop > -1 &&
        indicator
      ) {
        setIndicator(false);
      }
    }
    document
      .getElementById("problems-container")
      .addEventListener("wheel", getScrollPosition);
    return () => {
      document
        .getElementById("problems-container")
        .removeEventListener("wheel", getScrollPosition);
    };
  }, [indicator, setIndicator]);

  // Move viewport to earliest unanswered question
  useEffect(() => {
    if (!isMobile) {
      let index = 0;
      for (let i = 0; i < problems.length; i++) {
        if (problems[i].solved === false) {
          index = i;
          break;
        }
      }
      document.getElementById("problems-container").scrollTop =
        index * 0.7 * height;
    }
  }, [problems, height, isMobile]);

  // Update Answer Object
  useEffect(() => {
    answer.current = problems.map((problem) => {
      if (problem.solved) {
        return problem.answer;
      } else {
        return "";
      }
    });
  }, [problems]);

  // Move viewport to Previous question
  function handlePrevious(index) {
    if (index > 0) {
      document.getElementById("problems-container").scrollTop =
        0.7 * height * (index - 1);
    }
  }

  function handleSubmit(id, answer) {
    // Get problem at hand
    const theProblem = problems.filter((problem) => {
      return problem.id === id;
    })[0];
    // Ensure all is lowercase without padded spaces for comparison
    let answerKey;
    if (isNaN(parseInt(answer))) {
      answer = answer.toLowerCase().trim();
    }
    if (isNaN(parseInt(theProblem.answer))) {
      answerKey = theProblem.answer.toLowerCase().trim();
    }
    // Answer matches db answer
    if (answerKey === answer) {
      dispatch(addAnswer(id, addToast));
      setCorrect(true);
    } else {
      addToast(`Oops! That doesn't seem to be the correct answer. Try again.`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }

  // Move viewport to next question
  function handleNext(index) {
    if (index !== problems.length - 1) {
      document.getElementById("problems-container").scrollTop =
        0.7 * height * (index + 1);
    }
  }

  return (
    <div
      id="problems-container"
      className="problemsOuter-container disable-scrollbars"
    >
      <div className="problemsInner-container">
        {problems.map((problem, i) => {
          return (
            <Paper className={classes.PaperStyle} key={problem.id}>
              <div className="problem-container">
                <div className="question-container">
                  <h1>Topic: {problem.topic}</h1>
                  <p>{problem.question}</p>
                </div>
                {problem.solved ? (
                  <TextField
                    disabled
                    label="Your Answer"
                    defaultValue={answer.current[i]}
                    variant="outlined"
                    color="secondary"
                    style={{ width: "100%", marginBottom: "60px" }}
                    key={problem.id + "solved"}
                  />
                ) : (
                  <TextField
                    label="Input your answer here"
                    variant="outlined"
                    color="secondary"
                    defaultValue=""
                    helperText={""}
                    key={problem.id + "unsolved"}
                    style={{
                      width: "100%",
                      marginBottom: "60px",
                      zIndex: "50",
                    }}
                    onChange={(event) => {
                      answer.current[i] = event.target.value;
                    }}
                    onFocus={() => {
                      if (isMobile) {
                        setOverlay(true);
                      }
                      setTextFocus(true);
                      setFocusProblem(problem);
                    }}
                    onBlur={() => {
                      if (isMobile) {
                        setOverlay(false);
                      }
                      setTextFocus(false);
                      setFocusProblem(false);
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSubmit(problem.id, answer.current[i]);
                      }
                    }}
                  />
                )}
                {problem.solved ? (
                  <h1>The answer was "{problem.answer}"</h1>
                ) : null}
                <div className="buttons-container">
                  {i !== 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<NavigateBefore />}
                      className={classes.ButtonStyle}
                      onClick={() => {
                        handlePrevious(i);
                      }}
                    >
                      Previous
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<NavigateBefore />}
                      className={`${classes.ButtonStyle} ${classes.ButtonDisabledStyle}`}
                      style={{
                        minWidth: "120px",
                        fontWeight: "bold",
                        color: "white",
                        opacity: "0",
                        pointerEvents: "none",
                        marginLeft: "0",
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {problem.solved ? (
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<Replay />}
                      className={classes.ButtonStyle}
                      onClick={() => {
                        dispatch(deleteAnswer(problem.id));
                      }}
                    >
                      Redo
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<Check />}
                      className={classes.ButtonStyle}
                      onClick={() => {
                        handleSubmit(problem.id, answer.current[i]);
                      }}
                    >
                      Submit
                    </Button>
                  )}
                  {i !== problems.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<NavigateNext />}
                      className={classes.ButtonStyle}
                      onClick={() => {
                        handleNext(i);
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<NavigateNext />}
                      className={`${classes.ButtonStyle} ${classes.ButtonDisabledStyle}`}
                      onClick={() => {
                        handleNext(i);
                      }}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </Paper>
          );
        })}
        {overlay ? (
          <div
            style={{
              transform: "translateX(-12.5px)",
              background: "white",
              position: "fixed",
              top: "0",
              padding: "40px",
              height: "100%",
            }}
          >
            <div className="question-container">
              <h1>Topic: {focusProblem.topic}</h1>
              <p>{focusProblem.question}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Redux Actions
const mapDispatchToProps = (dispatch) => {
  return {
    addAnswer: (id, addAnswer) => {
      dispatch(addAnswer(id, addAnswer));
    },
    deleteAnswer: (id, addAnswer) => {
      dispatch(deleteAnswer(id, addAnswer));
    },
  };
};

// Redux HOC Wrapper
export default connect(mapDispatchToProps)(Problems);
