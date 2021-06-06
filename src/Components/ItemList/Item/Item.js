import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  deleteBtn: {
    color: theme.palette.error.main,
  },
  editBtn: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
  },
}));

export default function Item(props) {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemText primary={props.title} secondary={props.content} />
      <ListItemSecondaryAction>
        <IconButton
          onClick={props.edit}
          className={classes.editBtn}
          aria-label="delete"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={props.delete}
          className={classes.deleteBtn}
          aria-label="edit"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
