// Media
import ShibaInuNodImg from "./ShibaInuNod.gif";
// Styles
import "./ShibaInuNod.css";

const ShibaInuNod = ({ correct, setCorrect }) => {
  if (correct) {
    setTimeout(() => {
      setCorrect(false);
    }, 1170);
    return (
      <img
        className="shibaInu-nod"
        src={ShibaInuNodImg}
        alt="shiba inu nodding"
      />
    );
  } else {
    return null;
  }
};

export default ShibaInuNod;
