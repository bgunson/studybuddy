import React from "react";
import {
  Container,
  Button,
  Typography,
  List,
  LinearProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "../components/TodoItem";
import { useDraftTodos } from "../hooks/useDraftTodos";
import { DraftTodoItem } from "../components/DraftTodoItem";
import { useShowLoader } from "../hooks/util-hooks";

export function HomePage() {
  const { loading, todos, ...todoActions } = useTodos();
  const { draftTodos, ...draftTodoActions } = useDraftTodos();
  const showLoader = useShowLoader(loading, 200);
  return (
    <Container className="main-container" maxWidth="sm">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <div className="todo-items-container">
          <Typography component="p" variant="h5">
            What do you want to do?
          </Typography>
          <Button
            variant="contained"
            color="primary"
          >
            I am a teacher
          </Button>
          <Button
            variant="contained"
            color="primary"
          >
            I am a student
          </Button>
          
        </div>
      )}
    </Container>
  );
}
