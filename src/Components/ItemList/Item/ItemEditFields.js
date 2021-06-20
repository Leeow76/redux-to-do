import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editField: {
    width: "100%",
    marginRight: "16px",
    marginTop: theme.spacing(1),
  },
  saveBtn: {
    color: theme.palette.secondary.main,
  },
}));

export default function ItemEditFields(props) {
  const classes = useStyles();

  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);

  const saveEditedItem = (e) => {
    e.preventDefault();
    props.saveEditedItem({ title, content });
  };

  return (
    <>
      <form className={classes.form}>
        <TextField
          className={classes.editField}
          size="small"
          placeholder="In a few words"
          multiline
          color="secondary"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className={`${classes.editField} ${classes.contentField}`}
          size="small"
          placeholder="Add details"
          multiline
          color="secondary"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
      <IconButton
        className={classes.saveBtn}
        onClick={saveEditedItem}
        aria-label="save"
      >
        <SaveIcon />
      </IconButton>
    </>
  );
}
