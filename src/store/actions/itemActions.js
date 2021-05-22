import shortid from "shortid";

import * as itemActionTypes from "../actionTypes/itemActionTypes";

export const removeItem = (id) => (dispatch) => {
  dispatch({
    type: itemActionTypes.REMOVE_LIST_ITEM,
    id: id,
  });
};
export const fetchItemsLoading = (id) => (dispatch) => {
  dispatch({
    type: itemActionTypes.FETCH_ITEMS_LOADING,
    id: id,
  });
};
export const fetchItemsSuccess = (items) => (dispatch) => {
  dispatch({
    type: itemActionTypes.FETCH_ITEMS_SUCCESS,
    items: items,
  });
};
export const fetchItemsError = (error) => (dispatch) => {
  dispatch({
    type: itemActionTypes.FETCH_ITEMS_ERROR,
    error: error,
  });
};

export const fetchItems = () => async (dispatch) => {
  dispatch(fetchItemsLoading());
  try {
    const data = await (
      await fetch(
        "https://portfolio-76f4d-default-rtdb.europe-west1.firebasedatabase.app/items.json"
      )
    ).json();
    dispatch(fetchItemsSuccess(data));
  } catch (error) {
    dispatch(fetchItemsError(error));
  }
};
