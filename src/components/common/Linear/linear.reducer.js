import { createSlice, current } from "@reduxjs/toolkit";

// init state auth
const initialState = {
  open: false
};

export const linear = createSlice({
  name: "linear",
  initialState: initialState,
  reducers: {
    TOGGLE_LINEAR_PROGRESS: (state, action) => {
      return {
        ...current(state),
        open: action.payload.open
      };
    },
  },
});

// export actions to use
export const { TOGGLE_LINEAR_PROGRESS } = linear.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const linearState = (state) => state.linear;
//#endregion

export default linear.reducer;
