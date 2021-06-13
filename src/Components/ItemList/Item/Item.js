import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingRight: theme.spacing(18),
    minHeight: theme.spacing(9),
  },
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
    <ListItem button onClick={() => props.toggleCheck(props.isChecked)} className={classes.listItem}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={props.isChecked}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
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
