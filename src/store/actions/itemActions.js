import * as itemActionTypes from "../actionTypes/itemActionTypes";

// Simulating loading
async function stall(stallTime = 1000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

// Item list status actions
const fetchItemsLoading = (id) => (dispatch) => {
  dispatch({
    type: itemActionTypes.FETCH_ITEMS_LOADING,
    id: id,
  });
};
const fetchItemsSuccess = (items) => (dispatch) => {
  dispatch({
    type: itemActionTypes.FETCH_ITEMS_SUCCESS,
    items: items,
  });
};
const fetchItemsError = (error) => (dispatch) => {
  dispatch({
    type: itemActionTypes.FETCH_ITEMS_ERROR,
    error: error,
  });
};

// Item list actions
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

// Item actions
export const removeItem = (key) => async (dispatch) => {
  const settings = {
    method: "DELETE",
  };
  // Simulating loading
  await stall(500);
  try {
    const fetchResponse = await fetch(
      `https://portfolio-76f4d-default-rtdb.europe-west1.firebasedatabase.app/items/${key}.json`,
      settings
    );
    const data = await fetchResponse.json();

    dispatch({
      type: itemActionTypes.REMOVE_LIST_ITEM,
      key: key,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const toggleCheckItem = (key, isChecked) => async (dispatch) => {
  const settings = {
    method: "PATCH",
    body: JSON.stringify({
      isChecked: !isChecked
    }),
  };
  // Simulating loading
  await stall(200);
  try {
    const fetchResponse = await fetch(
      `https://portfolio-76f4d-default-rtdb.europe-west1.firebasedatabase.app/items/${key}.json`,
      settings
    );
    const data = await fetchResponse.json();

    dispatch({
      type: itemActionTypes.TOGGLECHECK_LIST_ITEM,
      item: {
        itemIsChecked: isChecked,
        itemKey: key,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
