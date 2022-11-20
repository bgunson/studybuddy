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
import { Chip } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function RoomsCard(props) {
  const { loading, todos, ...todoActions } = useTodos();
  const { draftTodos, ...draftTodoActions } = useDraftTodos();
  const showLoader = useShowLoader(loading, 200);
  return (
    
      <Card>
        <CardHeader
          avatar={
          <Avatar alt={props.name} src="https://thispersondoesnotexist.com/image" />} // Can change this to an image
          title={props.name}
          subheader = {props.description}
          action={
            <IconButton href="/chat">
              <ArrowOutwardIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 3, md: 4 }}
            >
              <Item><img src={`https://flagcdn.com/w20/${props.lang.toLowerCase()}.png`} srcSet={`https://flagcdn.com/w40/${props.lang.toLowerCase()}.png 2x`}/></Item>
              <Item> 🎓 {props.tutorCount}</Item>
              <Item> 👨‍🎓 {props.studentCount}</Item>
              {
                props.topics?.map((topic) => {
                  return <Item>{topic}</Item>
                })
              }
            </Stack>
          {/* <Typography variant="body2" color="text.secondary">John Doe is teaching geometry</Typography> */}
        </CardContent>
        {/* <CardActions>
          <Button>Share</Button>
          <IconButton>
              <AddBoxIcon />
            </IconButton>
        </CardActions> */}
      </Card>
  );
}
