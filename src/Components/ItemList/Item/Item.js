import React, { useState } from "react";

import ItemEditFields from "./ItemEditFields";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingRight: theme.spacing(2),
    minHeight: theme.spacing(9),
    display: "flex",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    position: "static",
    transform: "none",
  },
  deleteBtn: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(2),
  },
  editBtn: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
  },
}));

export default function Item(props) {
  const classes = useStyles();

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <ListItem className={classes.listItem}>
      <ListItemIcon>
        <Checkbox
          onClick={() => props.toggleCheck(props.isChecked)}
          edge="start"
          checked={props.isChecked}
        />
      </ListItemIcon>
      {!isEditMode && (
        <ListItemText primary={props.title} secondary={props.content} />
      )}
      {isEditMode && (
        <ItemEditFields
          title={props.title}
          content={props.content}
          saveEditedItem={({ title, content }) => {
            setIsEditMode(false);
            props.saveEditedItem({ title, content });
          }}
        />
      )}
      <ListItemSecondaryAction className={classes.actions}>
        {!isEditMode && (
          <IconButton
            onClick={() => setIsEditMode(true)}
            className={classes.editBtn}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        )}
        <IconButton
          onClick={props.delete}
          className={classes.deleteBtn}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
