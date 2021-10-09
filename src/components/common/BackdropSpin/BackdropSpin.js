import "./BackdropSpin.scss";
import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { backdropSpinState } from "./backdropSpin.reducer";

const BackdropCircle = () => {
  const backdropSpin = useSelector(backdropSpinState);

  return (
    <React.Fragment>
      <div className={backdropSpin.open ? "overlay" : "overlay none"}></div>
      <CircularProgress thickness={4.5} disableShrink className={backdropSpin.open ? "" : "none"} />
    </React.Fragment>
  );
};

export default BackdropCircle;
