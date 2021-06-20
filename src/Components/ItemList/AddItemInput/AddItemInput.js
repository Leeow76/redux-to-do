import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3, 2),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toDoTitle: {
    width: "100%",
  },
  toDoNotes: {
    marginTop: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(8)}px)`,
  },
  toDoSubmit: {
    padding: theme.spacing(1),
    minWidth: theme.spacing(4),
    marginRight: "0",
    borderRadius: "50%",
    marginTop: theme.spacing(2),
  },
  toDoSubmitIcon: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
}));

export default function AddItemInput(props) {
  const classes = useStyles();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit({ title, content, isChecked: false });
    resetForm();
  };

  return (
    <>
      <Divider />
      <FormControl fullWidth className={classes.form}>
        <TextField
          size="small"
          label="To do"
          placeholder="In a few words"
          multiline
          color="secondary"
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
          className={classes.toDoTitle}
        />
        <TextField
          size="small"
          label="Notes"
          placeholder="Add details"
          multiline
          color="secondary"
          variant="outlined"
          value={content}
          onChange={handleContentChange}
          className={classes.toDoNotes}
        />
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          className={classes.toDoSubmit}
          onClick={handleSubmit}
        >
          <AddIcon size="large" className={classes.toDoSubmitIcon} />
        </Button>
      </FormControl>
    </>
  );
}
