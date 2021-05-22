import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Item from "./Item/Item";
import AddItemInput from "./AddItemInput/AddItemInput";
import { removeItem, fetchItems } from "../../store/actions/itemActions";

const useStyles = makeStyles((theme) => ({
  listPaper: {
    marginTop: "12em",
    backgroundColor: theme.palette.primary.main,
  },
}));

function ItemList(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  // Redux state
  const itemStatus = useSelector((state) => state.itemReducer.status);
  const items = useSelector((state) => state.itemReducer.items);
  // Redux dispatch
  const remItem = (index) => dispatch(removeItem(index));

  // Update if status idle and status changes
  useEffect(() => {
    if (itemStatus === "idle") {
      dispatch(fetchItems());
    }
  }, [itemStatus, dispatch]);

  const itemComponents = items.map((item, index) => (
    <>
      <Item
        delete={() => remItem(item.id)}
        key={index}
        title={item.title}
        content={item.content}
      />
      {items.length !== index + 1 && (
        <Divider light variant="middle" component="li" />
      )}
    </>
  ));

  return (
    <Container maxWidth="sm">
      <Paper className={classes.listPaper} bgcolor="primary.main">
        <List>{itemComponents}</List>
        <AddItemInput />
      </Paper>
    </Container>
  );
}

export default ItemList;
