import { Paper, Button } from "@material-ui/core";
import ShibaInuNod from "./ShibaInuNod/ShibaInuNod";
import { useEffect, useState, useRef } from "react";
import "./Calculator.css";
import styles from "./CalculatorMuiStyles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => styles(theme));

const Calculator = ({ correct, setCorrect, textFocus }) => {
  const classes = useStyles();
  const [expression, setExpression] = useState(" ");
  const [calculation, setCalculation] = useState();
  let lastKey = useRef(null);

  useEffect(() => {
    function keyboardCalculator(e) {
      if (!textFocus) {
        if (!isNaN(parseInt(e.key))) {
          if (lastKey.current === "enter") {
            setExpression(e.key);
            setCalculation("");
          } else {
            setExpression(expression + e.key);
          }
          lastKey.current = "number";
        } else if (
          (e.key === "+" || e.key === "*" || e.key === "/" || e.key === "%") &&
          expression.length > 0
        ) {
          if (!(expression.length === 1 && expression[0] === "-")) {
            setExpression(expression + e.key);
            lastKey.current = "operation";
          }
        } else if (e.key === "-") {
          if (!(expression.length === 1 && expression[0] === "-")) {
            setExpression(expression + e.key);
            lastKey.current = "operation";
          }
        } else if (e.key === "Delete" || e.key === "Backspace") {
          setExpression(expression.slice(0, -1));
          lastKey.current = "delete";
        } else if (e.code.match(/[0-9]/) !== null) {
          setExpression(expression + e.code.match(/[0-9]/)[0]);
          lastKey.current = "number";
        } else if (e.key.toLowerCase() === "c") {
          setExpression("");
          setCalculation("");
          lastKey.current = "clear";
        } else if (e.key === "Enter" || e.key === "=") {
          if (
            !(expression.length === 1 && expression[0] === "-") &&
            !isNaN(expression.slice(-1))
          ) {
            setCalculation(eval(expression));
            lastKey.current = "enter";
          }
        }
      }
    }

    document.addEventListener("keydown", keyboardCalculator);
    return () => {
      document.removeEventListener("keydown", keyboardCalculator);
    };
  });

  useEffect(() => {
    if (expression === "") {
      setCalculation("");
    }
  }, [expression]);

  return (
    <div className="calculator-container">
      <Paper className={classes.PaperStyle}>
        {/* Display */}
        <div className="display-container">
          <div className="display-bg">
            <ShibaInuNod correct={correct} setCorrect={setCorrect} />
          </div>
          <div className="displayText-wrapper">
            <div className="displayText-container">
              <p className="expression">{expression}</p>
              <h1 className="calculation">{calculation}</h1>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div id="buttons">
          <div className="numpad-wrapper">
            <div className="numpad-container">
              {[
                "",
                "",
                "",
                "del",
                "c",
                "±",
                "%",
                "÷",
                1,
                2,
                3,
                "×",
                4,
                5,
                6,
                "−",
                7,
                8,
                9,
                "+",
                0,
                ".",
              ].map((symbol) => {
                if (symbol !== "") {
                  // Setting the if statements outside of button in lieu of inside style on onClick for better performance (less if/else evaluations)
                  if (Number.isInteger(symbol) || symbol === ".") {
                    return (
                      <Button
                        className={`${classes.MuiButton} ${classes.WhiteBg}`}
                        onClick={() => {
                          if (lastKey.current === "enter") {
                            setExpression(symbol);
                            setCalculation("");
                          } else {
                            setExpression(expression + String(symbol));
                          }
                          lastKey.current = "number";
                        }}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      >
                        {symbol}
                      </Button>
                    );
                  } else if (symbol === "+") {
                    return (
                      <Button
                        className={`${classes.MuiButton} ${classes.FaintBg}`}
                        onClick={() => {
                          if (
                            !(expression.length === 1 && expression[0] === "-")
                          ) {
                            setExpression(expression + symbol);
                            lastKey.current = "operation";
                          }
                        }}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      >
                        {symbol}
                      </Button>
                    );
                  } else if (symbol === "−") {
                    return (
                      <Button
                        className={`${classes.MuiButton} ${classes.FaintBg}`}
                        onClick={() => {
                          if (
                            !(expression.length === 1 && expression[0] === "-")
                          ) {
                            setExpression(expression + "-");
                            lastKey.current = "operation";
                          }
                        }}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      >
                        {symbol}
                      </Button>
                    );
                  } else if (symbol === "×") {
                    return (
                      <Button
                        className={`${classes.MuiButton} ${classes.FaintBg}`}
                        onClick={() => {
                          if (
                            !(expression.length === 1 && expression[0] === "-")
                          ) {
                            setExpression(expression + "*");
                            lastKey.current = "operation";
                          }
                        }}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      >
                        {symbol}
                      </Button>
                    );
                  } else if (symbol === "÷") {
                    return (
                      <Button
                        className={`${classes.MuiButton} ${classes.FaintBg}`}
                        onClick={() => {
                          if (
                            !(expression.length === 1 && expression[0] === "-")
                          ) {
                            setExpression(expression + "/");
                            lastKey.current = "operation";
                          }
                        }}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      >
                        {symbol}
                      </Button>
                    );
                  } else if (symbol === "del") {
                    return (
                      <Button
                        className={`${classes.MuiButton} ${classes.FaintBg} ${classes.Delete}`}
                        onClick={() => {
                          setExpression(expression.slice(0, -1));
                          lastKey.current = "delete";
                        }}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      >
                        {symbol}
                      </Button>
                    );
                  } else if (symbol === "c") {
                    return (
                      <Button
                        className={`${classes.MuiButton} ${classes.WhiteText}`}
                        onClick={() => {
                          setExpression("");
                          setCalculation("");
                          lastKey.current = "clear";
                        }}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      >
                        {symbol}
                      </Button>
                    );
                  } else if (symbol === "%") {
                    return (
                      <Button
                        className={`${classes.MuiButton} ${classes.WhiteText}`}
                        onClick={() => {
                          setExpression(expression + symbol);
                          lastKey.current = "operation";
                        }}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      >
                        {symbol}
                      </Button>
                    );
                  } else if (symbol === "±") {
                    return (
                      <Button
                        className={`${classes.MuiButton} ${classes.WhiteText}`}
                        onClick={() => {
                          if (expression[0] !== "-" || expression === "") {
                            setExpression("-(" + expression + ")");
                          } else {
                            setExpression(expression.slice(2, -1));
                          }
                          lastKey.current = "sign";
                        }}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                          }
                        }}
                      >
                        {symbol}
                      </Button>
                    );
                  }
                } else {
                  return <div />;
                }
              })}
            </div>
            <div className="equals-container">
              <Button
                variant="contained"
                className={`${classes.MuiButton} ${classes.Equals}`}
                onClick={() => {
                  if (
                    !(expression.length === 1 && expression[0] === "-") &&
                    !isNaN(expression.slice(-1))
                  ) {
                    setCalculation(eval(expression));
                    lastKey.current = "enter";
                  }
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                  }
                }}
              >
                =
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Calculator;
