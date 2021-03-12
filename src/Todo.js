import {
  Button,
  Input,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Update Todo Record!</h2>
      <Input
        placeholder={props.todo.todo}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <Button
        color="primary"
        onClick={() => {
          handleModal();
        }}
      >
        Update Record
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => {
          closeModal();
        }}
      >
        Close
      </Button>
    </div>
  );

  const deleteRecord = (id) => {
    console.log(id);
    db.collection("todos").doc(id).delete();
  };

  const handleModal = () => {
    console.log("handleModal called");
    console.log(props.todo.id);
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Grid item direction="row" sm={12}>
      <List>
        <Modal
          open={open}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <ListItem>
          <ListItemText
            primary={props.todo.todo}
            secondary={props.todo.todo}
          ></ListItemText>
          <Grid style={{ marginLeft: "50px" }}>
            <Edit color="secondary" onClick={() => setOpen(true)} />
            <DeleteForeverIcon
              variant="contained"
              color="primary"
              onClick={() => deleteRecord(props.todo.id)}
            />
          </Grid>
        </ListItem>
      </List>
    </Grid>
  );
}

export default Todo;
