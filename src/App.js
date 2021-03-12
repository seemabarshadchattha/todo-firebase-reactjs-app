import {
  Grid,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    // setTodos([...todos, input]);

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <Grid
      container
      sm={12}
      alignItems="center"
      justify="center"
      direction="column"
    >
      <Grid item>
        <h1>Todo Application 🚀.</h1>
        <FormControl>
          <InputLabel htmlFor="my-input">✅ Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          disabled={!input}
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </Grid>
      <Grid item direction="row" sm={12}>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </Grid>
    </Grid>
  );
}

export default App;
