import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import typeServices from "@services/type";
import apiServices from "@services/common.api";

export const TYPE_GET_BY_SITE = createAsyncThunk(
  "type/getbysite",
  async (params, thunkAPI) => {
    return await typeServices.getBySite(params);
  }
);

export const TYPE_GET_BY_PAGENO = createAsyncThunk(
  "type/getbypageno",
  async (params, thunkAPI) => {
    return await apiServices.getByPageNo(`type/getbypageno/`, params);
  }
);

export const TYPE_INSERT_NEW = createAsyncThunk(
  "type/insertnew",
  async (params, thunkAPI) => {
    return await apiServices.insertnew(`type/insertnew/`, params);
  }
);

export const TYPE_UPDATE = createAsyncThunk(
  "type/update",
  async (params, thunkAPI) => {
    return await apiServices.update(`type/update/`, params);
  }
);

export const TYPE_DELETE = createAsyncThunk(
  "type/delete",
  async (params, thunkAPI) => {
    return await apiServices.delete(`type/delete/`, params);
  }
);

// init state auth
const initialState = {
  isFetching: false,
  ok: true,
  message: "",
  // d: [{
  //   type_id: "",
  //   name: {},
  //   path: "",
  //   exact: false,
  //   public: false,
  //   component_import: "",
  //   childs: [],
  // }],
  d: [],
};

export const type = createSlice({
  name: "type",
  initialState: initialState,
  reducers: {
    TYPE_PENDING: (state) => {
      return {
        ...current(state),
        isFetching: true,
      };
    },
  },
  extraReducers: {
    //#region TYPE_GET_BY_SITE
    [TYPE_GET_BY_SITE.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [TYPE_GET_BY_SITE.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [TYPE_GET_BY_SITE.fulfilled]: (state, action) => {
      const response = action.payload;
      
      return {
        ...state,
        isFetching: false,
        ok: response.ok,
        message: response.message,
        d: response.rs,
      };
    },
    //#endregion
    //#region TYPE_GET_BY_PAGENO
    [TYPE_GET_BY_PAGENO.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [TYPE_GET_BY_PAGENO.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [TYPE_GET_BY_PAGENO.fulfilled]: (state, action) => {
      const response = action.payload;

      return {
        ...state,
        isFetching: false,
        ok: response.ok,
        message: response.message,
        d: response.rs,
        total: response.total,
      };
    },
    //#endregion
    //#region TYPE_INSERT_NEW
    [TYPE_INSERT_NEW.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [TYPE_INSERT_NEW.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [TYPE_INSERT_NEW.fulfilled]: (state, action) => {
      const response = action.payload;
      const currentState = current(state);

      return {
        ...currentState,
        isFetching: false,
        ok: response.ok,
        message: response.message,
        d: [response.rs].concat(currentState.d),
        total: currentState.total + 1,
      };
    },
    //#endregion
    //#region TYPE_UPDATE
    [TYPE_UPDATE.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [TYPE_UPDATE.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [TYPE_UPDATE.fulfilled]: (state, action) => {
      const response = action.payload;
      const currentState = current(state);

      return {
        ...currentState,
        isFetching: false,
        ok: response.ok,
        message: response.message,
        total: currentState.total,
        d: currentState.d.map((item) => {
          if (item._id === response.rs._id) {
            return {
              ...item,
              ...response.rs,
            };
          }

          return item;
        }),
      };
    },
    //#endregion
    //#region TYPE_DELETE
    [TYPE_DELETE.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [TYPE_DELETE.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [TYPE_DELETE.fulfilled]: (state, action) => {
      const response = action.payload;
      const currentState = current(state);

      return {
        ...currentState,
        isFetching: false,
        ok: response.ok,
        message: response.message,
        total: currentState.total - 1,
        d: currentState.d.filter((item) => {
          return item._id !== response.rs._id;
        }),
      };
    },
    //#endregion
  },
});

// export actions to use
export const { TYPE_PENDING } = type.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const typeState = (state) => state.type;
//#endregion

export default type.reducer;
