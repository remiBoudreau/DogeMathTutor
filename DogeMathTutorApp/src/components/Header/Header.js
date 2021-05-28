// React
import { useState } from "react";
// Custom Hooks
import useWindowDimensions from "../../hooks/useWindowDimensions";
// Material UI Components
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// Redux
import { connect, useDispatch } from "react-redux";
import { changeGrade } from "../../redux/actions/gradeActions";
// CSS Styles
import "./Header.css";
// Material UI Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "./HeaderMuiStyles";

const useStyles = makeStyles((theme) => styles(theme));

const Header = ({ grade, gradeSet }) => {
  const classes = useStyles();
  const [mobileGrade, setMobileGrade] = useState("");
  const dispatch = useDispatch();
  // Save Grade Change to Redux
  const handleChange = (event, newGrade) => {
    if (typeof newGrade === "object") {
      newGrade = newGrade.props.value;
    }
    dispatch(changeGrade(newGrade + 1));
    setMobileGrade(event.target.value);
  };

  // Get Width of viewport
  const { width } = useWindowDimensions();

  // Change Tabs to Dropdown if width small
  if (width < 706) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Grade</InputLabel>
          <Select value={mobileGrade} onChange={handleChange}>
            {gradeSet.map((grade) => {
              return <MenuItem value={grade}>Grade&nbsp;{grade}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    );
  } else {
    return (
      <Paper>
        <Tabs
          value={grade - 1}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          {gradeSet.map((grade) => {
            return (
              <Tab
                label={`Grade ${grade}`}
                key={grade}
                className={classes.root}
              />
            );
          })}
        </Tabs>
      </Paper>
    );
  }
};

// Redux Actions
const mapDispatchToProps = (dispatch) => {
  return {
    changeGrade: (grade) => {
      dispatch(changeGrade(grade));
    },
  };
};

// Redux HOC Wrapper
export default connect(mapDispatchToProps)(Header);
