// React
import { Fragment, useState, useEffect } from "react";
// Components
import Toggle from "./Toggle/Toggle";
import Calculator from "./Calculator/Calculator";
import Shibainu from "./ShibaInu/ShibaInu";
// Custom Hooks
import useWindowDimensions from "../../hooks/useWindowDimensions";
// Animations
import { motion } from "framer-motion";
// CSS Styles
import "./rightSide.css";

const RightSide = ({
  grade,
  problems,
  correct,
  setCorrect,
  textFocus,
  isMobile,
}) => {
  const [showCalculator, setShowCalculator] = useState(true);
  const [calcOverlay, setCalcOverlay] = useState(false);

  // Get width
  const { width } = useWindowDimensions();
  // Default calculator show/hidden behaviour for different widths; can't use CSS, depends on state
  useEffect(() => {
    if (width <= 960) {
      setShowCalculator(false);
    } else {
      setShowCalculator(true);
    }
  }, [width]);

  return (
    <Fragment>
      {grade > 0 ? (
        <Fragment>
          {showCalculator ? (
            <Fragment>
              <motion.div
                initial={{ y: "100vh" }}
                animate={{ y: "0vh" }}
                transition={{ duration: 1, type: "spring", stiffness: 60 }}
                className="calculator-wrapper"
                key={0}
              >
                <Calculator
                  correct={correct}
                  setCorrect={setCorrect}
                  textFocus={textFocus}
                />
              </motion.div>
              {calcOverlay ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="calculator-overlay"
                    onClick={() => {
                      setCalcOverlay(false);
                      setShowCalculator(false);
                    }}
                  />
                </motion.div>
              ) : null}
            </Fragment>
          ) : null}
          {isMobile && textFocus ? null : (
            <div className="toggle-wrapper">
              <Toggle
                problems={problems}
                showCalculator={showCalculator}
                setShowCalculator={setShowCalculator}
                calcOverlay={calcOverlay}
                setCalcOverlay={setCalcOverlay}
              />
            </div>
          )}
        </Fragment>
      ) : (
        <div class="shibaInu-wrapper">
          <Shibainu />
        </div>
      )}
    </Fragment>
  );
};

export default RightSide;
