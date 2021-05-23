import * as itemActionTypes from "../actionTypes/itemActionTypes";

import shortid from "shortid";

const initialState = {
  status: "idle",
  error: null,
  items: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case itemActionTypes.FETCH_ITEMS_LOADING:
      return {
        ...state,
        status: "loading",
      };
    case itemActionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        items: action.items,
      };
    case itemActionTypes.FETCH_ITEMS_ERROR:
      return {
        ...state,
        status: "failed",
        error: action.error,
      };
    case itemActionTypes.REMOVE_LIST_ITEM:
      return {
        ...state,
        items: state.items.filter((v) => v.id !== action.id),
      };
    case itemActionTypes.ADD_LIST_ITEM:
      return {
        ...state,
        items: [...state.items, { ...action.data, id: shortid.generate() }],
      };
    default:
      return state;
  }
};

export default itemReducer;
