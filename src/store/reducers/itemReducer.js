import * as itemActionTypes from "../actionTypes/itemActionTypes";

const initialState = {
  status: "idle",
  error: null,
  items: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case itemActionTypes.REMOVE_LIST_ITEM:
      return {
        ...state,
        items: state.items.filter((v) => v.id !== action.id),
      };
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
    default:
      return state;
  }
};

export default itemReducer;
