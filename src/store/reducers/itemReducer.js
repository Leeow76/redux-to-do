import * as itemActionTypes from "../actionTypes/itemActionTypes";

const initialState = {
  items: [
    {
      title: "Dummy title",
      content: "Dummy content",
      id: "_1tKdHc2t",
    },
    {
      title: "Dummy title 2",
      content: "Dummy content 2",
      id: "zZtWpv9GF",
    },
    {
      title: "Dummy title 3",
      content: "Dummy content 3",
      id: "gHeEVbUia",
    },
  ],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case itemActionTypes.REMOVE_LIST_ITEM:
      return {
        ...state,
        items: state.items.filter((v) => v.id !== action.id),
      };
    default:
      return state;
  }
};

export default itemReducer;
