import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Item from "./Item/Item";
import AddItemInput from "./AddItemInput/AddItemInput";
import * as itemActions from "../../store/actions/itemActions";

const useStyles = makeStyles((theme) => ({
  listPaper: {
    marginTop: "12em",
    backgroundColor: theme.palette.primary.main,
  },
  itemsLoader: {
    display: "block",
    margin: "0 auto",
    padding: theme.spacing(3),
    boxSizing: "content-box",
  },
}));

function ItemList(props) {
  const classes = useStyles();

  // Local state to store and pass edit item data
  const [isEditMode, setTitle] = useState();
  const [editData, setEditData] = useState();

  // Redux state
  const dispatch = useDispatch();
  const itemStatus = useSelector((state) => state.itemReducer.status);
  const items = useSelector((state) => state.itemReducer.items);
  const itemsError = useSelector((state) => state.itemReducer.error);

  // Redux dispatch
  const removeListItem = (index) => dispatch(itemActions.removeItem(index));
  const addListItem = (data) => dispatch(itemActions.addItem(data));
  const fetchItems = () => dispatch(itemActions.fetchItems());

  // Update if status idle and status changes
  useEffect(() => {
    if (itemStatus === "idle") {
      dispatch(itemActions.fetchItems());
    }
  }, [itemStatus, dispatch]);

  const editListItem = (editData) => {
    console.log(editData);
    return editData;
  };

  let itemComponents = null;
  if (itemStatus !== "failed") {
    itemComponents = items.map((item, index) => (
      <React.Fragment key={index}>
        <Item
          delete={() => removeListItem(item.id)}
          edit={() => editListItem(item)}
          title={item.title}
          content={item.content}
        />
        {items.length !== index + 1 && (
          <Divider light variant="middle" component="li" />
        )}
      </React.Fragment>
    ));
  }

  return (
    <Container maxWidth="sm">
      <Paper className={classes.listPaper} bgcolor="primary.main">
        {itemStatus === "loading" && (
          <CircularProgress className={classes.itemsLoader} color="secondary" />
        )}
        {itemStatus === "failed" && (
          <Alert
            action={
              <Button onClick={fetchItems} color="inherit" size="small">
                RETRY
              </Button>
            }
            variant="filled"
            severity="error"
          >
            {itemsError.message}
          </Alert>
        )}
        {itemStatus === "succeeded" && items.length > 0 && (
          <List>{itemComponents}</List>
        )}
        <AddItemInput
          editData={editListItem(editData)}
          submit={(data) => addListItem(data)}
        />
      </Paper>
    </Container>
  );
}

export default ItemList;
