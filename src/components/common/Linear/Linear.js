import "./linear.scss";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSelector } from "react-redux";
import { linearState } from "./linear.reducer";

const Linear = () => {
  const linear = useSelector(linearState);
  let cssClass = "linear-container";
  cssClass += linear.open ? "" : " none";
  
  return (
    <div className={cssClass}>
      <LinearProgress color="secondary" />;
    </div>
  );
};

export default Linear;
