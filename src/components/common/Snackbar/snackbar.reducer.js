import { createSlice, current } from "@reduxjs/toolkit";

// init state auth
const initialState = {
  open: false,
  message: "",
  severity: "success",
  vertical: "bottom",
  horizontal: "left",
};

export const snackbar = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {
    TOGGLE_SNACKBAR_ALERT: (state, action) => {
      return {
        ...current(state),
        open: action.payload.open,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    },
  },
});

// export actions to use
export const { TOGGLE_SNACKBAR_ALERT } = snackbar.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const snackbarState = (state) => state.snackbar;
//#endregion

export default snackbar.reducer;
