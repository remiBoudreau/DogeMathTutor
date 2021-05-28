// Media
import ShibaInuLoadingImg from "./ShibaInuLoading.gif";
// Styles
import "./ShibaInuLoading.css";

const ShibaInuLoading = () => {
  return (
    <img
      src={ShibaInuLoadingImg}
      className="shibaInuLoading-image"
      alt="loading animation"
    />
  );
};

export default ShibaInuLoading;
