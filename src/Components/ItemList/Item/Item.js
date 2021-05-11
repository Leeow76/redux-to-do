import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export default function Item(props) {
  return (
    <ListItem>
      <ListItemText primary={props.title} secondary={props.content} />
      <ListItemSecondaryAction>
        <IconButton onClick={props.edit} edge="start" aria-label="delete">
          <EditIcon />
        </IconButton>
        <IconButton onClick={props.delete} edge="end" aria-label="edit">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
