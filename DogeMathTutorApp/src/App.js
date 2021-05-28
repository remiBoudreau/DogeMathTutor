// React
import { useEffect, useState, Fragment } from "react";
// Components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import ShibaInuLoading from "./components/ShibaInuLoading/ShibaInuLoading";
// Redux-persist local state actions/reducers
import { connect, useDispatch } from "react-redux";
import { fetchAllProblems } from "./redux/actions/problemsActions";
import { getGrade } from "./redux/actions/gradeActions";

function App({ allProblems, grade }) {
  const dispatch = useDispatch();
  const [overlay, setOverlay] = useState(false);

  // Fetch last state
  useEffect(() => {
    dispatch(fetchAllProblems());
    dispatch(getGrade());
  }, [dispatch]);

  if (allProblems.length !== 0) {
    // Get all grades in array
    let allGrades = [];
    for (let i = 0; i < allProblems.length; i++) {
      allGrades = allGrades.concat(allProblems[i].grades);
    }
    // Get set of allGrades
    const getSet = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const gradeSet = allGrades.filter(getSet);

    // Filter allProblems for grade selected
    let problems = allProblems.filter((problem) => {
      return problem.grades.includes(grade);
    });

    return (
      <Fragment>
        {!overlay ? (
          <Fragment>
            <Header grade={grade} gradeSet={gradeSet} overlay={overlay} />
            <Footer />
          </Fragment>
        ) : null}
        <Main
          problems={problems}
          grade={grade}
          overlay={overlay}
          setOverlay={setOverlay}
        />
      </Fragment>
    );
  } else {
    // Loading Screen
    return <ShibaInuLoading />;
  }
}

// Redux State
const mapStateToProps = (state) => {
  return {
    allProblems: state.allProblemsData,
    grade: state.gradeData,
  };
};

// Redux Actions
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProblems: () => {
      dispatch(fetchAllProblems());
    },
    getGrade: () => {
      dispatch(getGrade());
    },
  };
};

// Redux HOC Wrapper
export default connect(mapStateToProps, mapDispatchToProps)(App);
