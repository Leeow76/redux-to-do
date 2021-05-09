import shortid from "shortid";

import * as itemActionTypes from "../actionTypes/itemActionTypes";

export const removeItem = (id) => (dispatch) => {
  dispatch({
    type: itemActionTypes.REMOVE_LIST_ITEM,
    id: id,
  });
};
