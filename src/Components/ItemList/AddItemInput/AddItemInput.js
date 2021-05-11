import React from "react";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

export default function AddItemInput() {
  const [contentValue, setContentValue] = React.useState();

  const handleContentChange = (event) => {
    setContentValue(event.target.value);
  };

  return (
    <>
      <Divider />
      <FormControl fullWidth style={{ padding: "8px 16px" }}>
        <TextField
          label="To do"
          placeholder="In a few words"
          multiline
          color="secondary"
          margin="dense"
          variant="outlined"
          value={contentValue}
          onChange={handleContentChange}
        />
        <TextField
          label="Notes"
          placeholder="Add details"
          multiline
          color="secondary"
          margin="dense"
          variant="outlined"
          value={contentValue}
          onChange={handleContentChange}
        />
      </FormControl>
      <h2>{contentValue}</h2>
    </>
  );
}
