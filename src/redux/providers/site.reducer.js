import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import siteServices from "@services/site";

export const SITE_GET_BY_NAME = createAsyncThunk(
  "site/getbyname",
  async (params, thunkAPI) => {
    return await siteServices.getByName(params);
  }
);

// init state auth
const initialState = {
  isFetching: false,
  ok: true,
  message: "",
  d: {
    _id: 0,
    name: "",
    types: [],
    title: [],
    locale: [],
  },
};

export const site = createSlice({
  name: "site",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [SITE_GET_BY_NAME.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [SITE_GET_BY_NAME.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [SITE_GET_BY_NAME.fulfilled]: (state, action) => {
      const response = action.payload;
      return {
        ...state,
        isFetching: false,
        ok: response.ok,
        message: response.message,
        d: response.rs,
      };
    },
  },
});

// export actions to use
export const {} = site.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const siteState = (state) => state.site;
//#endregion

export default site.reducer;
