import React, { useEffect } from "react";
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
  listItem: {
    "& > .MuiListItem-container": {
      display: "flex",
    },
  },
}));

function ItemList() {
  const classes = useStyles();

  // Redux state
  const dispatch = useDispatch();
  const itemStatus = useSelector((state) => state.itemReducer.status);
  const items = useSelector((state) => state.itemReducer.items);
  const itemsError = useSelector((state) => state.itemReducer.error);

  // Redux dispatch
  const fetchItems = () => dispatch(itemActions.fetchItems());
  const removeListItem = (key) => dispatch(itemActions.removeItem(key));
  const toggleCheckListItem = (key, isChecked) =>
    dispatch(itemActions.toggleCheckItem(key, isChecked));
  const addListItem = (itemData) => dispatch(itemActions.addItem(itemData));
  const saveEditedItem = (key, itemData) => {
    dispatch(itemActions.editItem(key, itemData));
  };

  // Update if status idle and status changes
  useEffect(() => {
    if (itemStatus === "idle") {
      dispatch(itemActions.fetchItems());
    }
  }, [itemStatus, dispatch]);

  let itemComponents = null;
  if (itemStatus !== "failed") {
    itemComponents = Object.keys(items).map((key, index) => (
      <div className={classes.listItem} key={key}>
        <Item
          delete={() => removeListItem(key)}
          toggleCheck={(isChecked) => toggleCheckListItem(key, isChecked)}
          title={items[key].title}
          content={items[key].content}
          isChecked={items[key].isChecked}
          saveEditedItem={({ title, content }) =>
            saveEditedItem(key, { title, content })
          }
        />
        {Object.keys(items).length !== index + 1 && (
          <Divider light variant="middle" component="li" />
        )}
      </div>
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
        {itemStatus === "succeeded" && Object.keys(items).length > 0 && (
          <List>{itemComponents}</List>
        )}
        <AddItemInput submit={(itemData) => addListItem(itemData)} />
      </Paper>
    </Container>
  );
}

export default ItemList;
