// Material UI Components
import { Button, Paper } from "@material-ui/core";
// CSS Styles
import "./Toggle.css";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "./ToggleMuiStyles.js";
const useStyles = makeStyles(styles);

const Toggle = ({
  problems,
  showCalculator,
  setShowCalculator,
  calcOverlay,
  setCalcOverlay,
}) => {
  const classes = useStyles();
  // Calculate score from count of problems.solved
  const score = problems.filter((problem) => {
    return problem.solved;
  }).length;

  return (
    <div className="toggle-container">
      <Paper className={classes.PaperStyle}>
        <div className="perm-tooltip">
          {showCalculator ? (
            <h4 className="tooltip-text">Hide&nbsp;Calculator</h4>
          ) : (
            <h4 className="tooltip-text">Show&nbsp;Calculator</h4>
          )}
        </div>
      </Paper>
      <Button
        className={classes.ButtonStyle}
        onClick={() => {
          setShowCalculator(!showCalculator);
          setCalcOverlay(!calcOverlay);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
          }
        }}
      >
        {score}/{problems.length}
      </Button>
    </div>
  );
};

export default Toggle;
