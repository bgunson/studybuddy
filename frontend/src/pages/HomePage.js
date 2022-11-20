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
import { Dashboard } from "../components/Dashboard";

export function HomePage() {
  const { loading, todos, ...todoActions } = useTodos();
  const { draftTodos, ...draftTodoActions } = useDraftTodos();
  const [role, setRole] = React.useState(null);
  const showLoader = useShowLoader(loading, 200);
  return (
    <Container className="main-container" maxWidth="md">      {
      !role ?
        <div>

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
                style={{ width: '126px' }}
                variant="contained"
                color="primary"
                onClick={() => setRole("tutor")}
              >
                I am a tutor
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setRole("student")}
              >
                I am a learner
              </Button>

            </div>
          )}
        </div>

        :
        <Dashboard role={role} />
    }
    </Container>

  );
}
