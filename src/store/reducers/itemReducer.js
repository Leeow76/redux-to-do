import * as itemActionTypes from "../actionTypes/itemActionTypes";

const initialState = {
  status: "idle",
  error: null,
  items: {
    suvaline: {
      name: "tere",
      id: "tere",
      content: "tere",
    },
  },
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
      const removeListItems = { ...state.items };
      delete removeListItems[action.key.toString()];
      return {
        ...state,
        items: removeListItems,
      };
    case itemActionTypes.TOGGLECHECK_LIST_ITEM:
      const toggleCheckItems = { ...state.items };
      toggleCheckItems[action.item.itemKey].isChecked =
        !action.item.itemIsChecked;
      return {
        ...state,
        items: toggleCheckItems,
      };
    case itemActionTypes.EDIT_LIST_ITEM:
      const editItems = { ...state.items };
      editItems[action.item.itemKey].title = action.item.itemTitle;
      editItems[action.item.itemKey].content = action.item.itemContent;
      return {
        ...state,
        items: editItems,
      };
    case itemActionTypes.ADD_LIST_ITEM:
      let newItems = { ...state.items };
      newItems[action.item.itemKey.name] = action.item.itemBody;
      return {
        ...state,
        items: {
          ...newItems,
        },
      };
    default:
      return state;
  }
};

export default itemReducer;
