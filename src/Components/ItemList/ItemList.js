import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Item from "./Item/Item";
import { removeItem } from "../../store/actions/itemActions";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
  },
}));

function ItemList(props) {
  const classes = useStyles();

  const itemComponents = props.items.map((item, index) => (
    <Item
      clicked={() => props.removeItem(item.id)}
      key={index}
      title={item.title}
      content={item.content}
    />
  ));

  return (
    <div className={classes.listContainer}>
      <List>{itemComponents}</List>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.listReducer.items,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (index) => dispatch(removeItem(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
