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

export function LandingPage() {
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
            Welcome, StudyBuddy!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            // startIcon={<AddIcon />}
            onClick={() => draftTodoActions.createDraftTodo()}
          >
            Start Session
          </Button>
          {/* <List style={{ width: "100%" }}>
            {todos.map((todo) => (
              <TodoItem
                key={String(todo._id)}
                todo={todo}
                todoActions={todoActions}
              />
            ))}
            {draftTodos.map((draft) => (
              <DraftTodoItem
                key={String(draft._id)}
                todo={draft}
                todoActions={todoActions}
                draftTodoActions={draftTodoActions}
              />
            ))}
          </List> */}
        </div>
      )}
    </Container>
  );
}
