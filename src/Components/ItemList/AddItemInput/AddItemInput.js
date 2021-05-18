import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toDoTitle: {
    width: `calc(100% - ${theme.spacing(7)}px)`,
  },
  toDoNotes: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  toDoSubmit: {
    padding: theme.spacing(1),
    minWidth: theme.spacing(4),
    margin: "0",
    borderRadius: "50%",
  },
  toDoSubmitIcon: {
    height: theme.spacing(3),
    width: theme.spacing(3),
  },
}));

export default function AddItemInput() {
  const [contentValue, setContentValue] = React.useState();
  const classes = useStyles();

  const handleContentChange = (event) => {
    setContentValue(event.target.value);
  };

  return (
    <>
      <Divider />
      <FormControl fullWidth className={classes.form}>
        <TextField
          size="medium"
          label="To do"
          placeholder="In a few words"
          multiline
          color="secondary"
          variant="outlined"
          value={contentValue}
          onChange={handleContentChange}
          className={classes.toDoTitle}
        />
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          className={classes.toDoSubmit}
        >
          <AddIcon size="large" className={classes.toDoSubmitIcon} />
        </Button>
        <TextField
          size="medium"
          label="Notes"
          placeholder="Add details"
          multiline
          color="secondary"
          variant="outlined"
          value={contentValue}
          onChange={handleContentChange}
          className={classes.toDoNotes}
        />
      </FormControl>
    </>
  );
}
