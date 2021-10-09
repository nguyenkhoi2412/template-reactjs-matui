import { current } from "@reduxjs/toolkit";

export default {
  INITIAL_STATE: {
    isFetching: false,
    ok: true,
    message: "",
    d: [],
  },
  GET: (state, response, additionalData = {}) => {
    const tempState = {
      ...state,
      isFetching: false,
      ok: response.ok,
      message: response.message,
      d: response.rs,
    };

    return {
      ...tempState,
      ...additionalData,
    };
  },
  INSERT: (state, response, additionalData = {}) => {
    const tempState = {
      ...state,
      isFetching: false,
      ok: response.ok,
      message: response.message,
      d: [response.rs].concat(state.d),
    };

    return {
      ...tempState,
      ...additionalData,
    };
  },
  UPDATE: (state, response, additionalData = {}) => {
    const tempState = {
      ...state,
      isFetching: false,
      ok: response.ok,
      message: response.message,
      d: state.d.map((item) => {
        if (item._id === response.rs._id) {
          return {
            ...item,
            ...response.rs,
          };
        }

        return item;
      }),
    };

    return {
      ...tempState,
      ...additionalData,
    };
  },
  DELETE: (state, response, additionalData = {}) => {
    const tempState = {
      ...state,
      isFetching: false,
      ok: response.ok,
      message: response.message,
      d: state.d.filter((item) => {
        return item._id !== response.rs._id;
      }),
    };

    return {
      ...tempState,
      ...additionalData,
    };
  },
};
