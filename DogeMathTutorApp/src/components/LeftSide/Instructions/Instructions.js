// React
import { Fragment } from "react";
// Material UI Components
import { Paper } from "@material-ui/core";
// CSS Styles
import "./Instructions.css";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "./InstructionsMuiStyles";
const useStyles = makeStyles(styles);

const Instructions = () => {
  const classes = useStyles();

  const instructions = `Welcome to DogeMathTutor, your new favorite Math tutor! Here's how it works. 
                        Select your grade above and questions will appear in boxes on the left while a calculator will appear on the right. 
                        Some problems are answered with a number while others are answered with a word or expression. 
                        Keep your answers as simple as possible to ensure our shibas checking your answers understand you. 
                        Don't worry if you can't solve a few, you can skip them with the skip button. 
                        After you typed your answer, send it to our shibas with the submit buttom.
                        If you need to take a break, don't worry - your answers are saved for when you return!`;
  return (
    <Fragment>
      <Paper elevation={0} className={classes.PaperStyle}>
        <div className="text-container">
          <h1>Hi there!</h1>
          <p className="instructions">{instructions}</p>
          <h3 className="instructions-footer">
            Click your grade above to get started
          </h3>
        </div>
      </Paper>
    </Fragment>
  );
};

export default Instructions;
