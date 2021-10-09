import { createSlice } from "@reduxjs/toolkit";

// init state
const initialState = {
  open: false
};

export const backdropSpin = createSlice({
  name: "backdropSpin",
  initialState: initialState,
  reducers: {
    TOGGLE_SPIN_BACKDROP: (state, action) => {
      return {
        ...state,
        open: action.payload.open,
      };
    },
    SHOW_SPIN_BACKDROP: (state) => {
      return {
        ...state,
        open: true,
      };
    },
    HIDE_SPIN_BACKDROP: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// export actions to use
export const { TOGGLE_SPIN_BACKDROP, SHOW_SPIN_BACKDROP, HIDE_SPIN_BACKDROP } = backdropSpin.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const backdropSpinState = (state) => state.backdropSpin;
//#endregion

export default backdropSpin.reducer;
