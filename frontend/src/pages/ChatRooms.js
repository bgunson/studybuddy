import React from "react";
import {
  Container,
  Button,
  Typography,
  List,
  LinearProgress,
  Box,
  Card,
  CardContent,
  CardActions,
  Avatar,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "../components/TodoItem";
import { useDraftTodos } from "../hooks/useDraftTodos";
import { DraftTodoItem } from "../components/DraftTodoItem";
import { useShowLoader } from "../hooks/util-hooks";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { RoomsCard } from "../components/RoomsCard";

const cardData = {
  name: "test",
  description: "test description",
  tutorCount: "5",
  studentCount: "10",
  lang: "🇬🇧"

}

export function ChatRooms() {
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
        <div>
          <Stack spacing={2}>
            <RoomsCard {...cardData}>

            </RoomsCard>

    </Stack>
        </div>
      )}
    </Container>
  );
}
