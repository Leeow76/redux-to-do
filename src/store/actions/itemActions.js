import * as itemActionTypes from "../actionTypes/itemActionTypes";

// Simulating loading
async function stall(stallTime = 1000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

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
  // Simulating loading
  await stall();
  try {
    const data = await (
      await fetch(
        "https://portfolio-76f4d-default-rtdb.europe-west1.firebasedatabase.app/items.json"
      )
    ).json();
    if (data) {
      dispatch(fetchItemsSuccess(data));
    } else {
      throw new Error("Could not fetch to-do items!");
    }
  } catch (error) {
    dispatch(fetchItemsError(error));
  }
};

export const addItem = (item) => async (dispatch) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(item),
  };
  // Simulating loading
  await stall();
  try {
    const fetchResponse = await fetch(
      "https://portfolio-76f4d-default-rtdb.europe-west1.firebasedatabase.app/items.json",
      settings
    );
    const data = await fetchResponse.json();
    dispatch({
      type: itemActionTypes.ADD_LIST_ITEM,
      item: {
        itemBody: item,
        itemKey: data,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const removeItem = (item) => async (dispatch) => {
  const settings = {
    method: "DELETE",
  };
  // Simulating loading
  await stall();
  try {
    const fetchResponse = await fetch(
      `https://portfolio-76f4d-default-rtdb.europe-west1.firebasedatabase.app/items/${item}.json`,
      settings
    );
    const data = await fetchResponse.json();

    dispatch({
      type: itemActionTypes.REMOVE_LIST_ITEM,
      item: item,
    });
    return data;
  } catch (error) {
    return error;
  }
};
