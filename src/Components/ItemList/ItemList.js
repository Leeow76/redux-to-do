import React from "react";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Item from "./Item/Item";
import AddItemInput from "./AddItemInput/AddItemInput";
import { removeItem } from "../../store/actions/itemActions";

const useStyles = makeStyles((theme) => ({
  listBox: {
    marginTop: "12em",
  },
}));

function ItemList(props) {
  const classes = useStyles();

  const itemComponents = props.items.map((item, index) => (
    <>
      <Item
        delete={() => props.removeItem(item.id)}
        key={index}
        title={item.title}
        content={item.content}
      />
      {props.items.length !== index + 1 && (
        <Divider light variant="middle" component="li" />
      )}
    </>
  ));

  return (
    <Container maxWidth="sm">
      <Box className={classes.listBox} bgcolor="primary.main">
        <List>{itemComponents}</List>
        <AddItemInput />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.itemReducer.items,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (index) => dispatch(removeItem(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
