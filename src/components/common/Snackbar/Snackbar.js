import "./Snackbar.scss";
import React from "react";
//#region material
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
//#endregion
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_SNACKBAR_ALERT, snackbarState } from "./snackbar.reducer";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarmaUI = (props) => {
  const snackbar = useSelector(snackbarState);
  const { open, vertical, horizontal } = snackbar;
  const dispatch = useDispatch();

  let autoHideDuration = 4000;
  if (props.timerHide !== undefined) autoHideDuration = props.timerHide;

  //#region handle events
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(TOGGLE_SNACKBAR_ALERT(false));
  };
  //#endregion

  //#region render html content
  return (
    <>
      {/** Snackbar show message results */}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={autoHideDuration}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarmaUI;
