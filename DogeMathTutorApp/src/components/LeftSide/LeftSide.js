// React
import { Fragment, useState } from "react";
// Components
import Instructions from "./Instructions/Instructions";
import Problems from "./Problems/Problems";
import ScrollIndicator from "./ScrollIndicator/ScrollIndicator";
// Media
import TriangleImg from "./Triangle.png";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// CSS Styles
import "./LeftSide.css";

const LeftSide = ({
  problems,
  grade,
  setCorrect,
  textFocus,
  setTextFocus,
  isMobile,
  overlay,
  setOverlay,
}) => {
  const [indicator, setIndicator] = useState(true);

  return (
    <Fragment>
      {grade > 0 ? (
        <Fragment>
          <AnimatePresence>
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: "0vh" }}
              exit={{ x: "-100vw" }}
              transition={{ duration: 1, type: "spring", stiffness: 60 }}
              className="problems-wrapper"
              key={grade}
            >
              <Problems
                problems={problems}
                setCorrect={setCorrect}
                textFocus={textFocus}
                setTextFocus={setTextFocus}
                indicator={indicator}
                setIndicator={setIndicator}
                isMobile={isMobile}
                overlay={overlay}
                setOverlay={setOverlay}
              />
            </motion.div>
          </AnimatePresence>
          {indicator && !isMobile ? (
            <div className="scrollIndicator-wrapper">
              <ScrollIndicator />
            </div>
          ) : null}
        </Fragment>
      ) : (
        <Fragment>
          <div className="instructions-wrapper">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Instructions />
            </motion.div>
          </div>
          <div className="triangleOutside-wrapper">
            <div className="triangleInside-wrapper">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <img src={TriangleImg} alt="triangle" className="triangle" />
              </motion.div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LeftSide;
