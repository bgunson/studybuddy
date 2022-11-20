import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "../components/TodoItem";
import { useDraftTodos } from "../hooks/useDraftTodos";
import { DraftTodoItem } from "../components/DraftTodoItem";
import { useShowLoader } from "../hooks/util-hooks";
import YoutubeEmbed from "../components/YoutubeEmbed";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { RoomsCard } from "./RoomsCard";
import { Button } from "@mui/material";

const YOUTUBE_KEY = 'API_KEY';
const query = 'math;calculus';

const cardData = [
    {
        name: "test",
        description: "test description",
        tutorCount: "5",
        studentCount: "10",
        lang: "GB",
        topics: [
            'Science', "Math"
        ]
    },
    {
        name: "test",
        description: "test description",
        tutorCount: "5",
        studentCount: "10",
        lang: "GB"
    },
    {
        name: "test sregsd",
        description: "test description",
        tutorCount: "5",
        studentCount: "10",
        lang: "GB"
    }
];

export function Dashboard(props) {
    const { loading, todos, ...todoActions } = useTodos();
    const { draftTodos, ...draftTodoActions } = useDraftTodos();
    const [userTopics, setUserTopics] = useState([]);
    const showLoader = useShowLoader(loading, 200);
    const [suggestedVideos, setSuggestedVideos] = useState([]);

    useEffect(() => {
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${YOUTUBE_KEY}`)
            .then((res) => res.json())
            .then((res) => {
                let items = (res.items || []).slice(0, 5);
                setSuggestedVideos(items);
            })
    }, []);

    return (
        <div style={{ margin: '10px' }}>
            {
                userTopics.length === 0 ?
                    <h1 className="roll-out">Search a topic to get started.</h1> : null
            }

            <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={topics}
                onChange={(event, value) => setUserTopics(value)}
                renderInput={(params) => (
                    <TextField {...params} label="Search topics" placeholder="Search topics" />
                )}
                sx={{ width: '100%' }}
            />


            <h2>Active Rooms
                {
                    userTopics.length === 0 ?
                        null :
                        <Button
                            style={{ float: 'right' }}
                            variant="contained"
                            color="primary"
                            href="/chat"
                        >
                            Create room
                        </Button>
                }
            </h2>

            <Stack spacing={2}>
                {
                    cardData.map((card) => {
                        return <RoomsCard {...card}></RoomsCard>
                    })
                }
            </Stack>

            <h2>
                Suggested Videos
            </h2>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
                {
                    !suggestedVideos.length ?
                        <div>Sorry, nothing to show.</div>
                        :
                        suggestedVideos.map((v) => {
                            return (
                                <div style={{ margin: '5px' }}>
                                    <YoutubeEmbed embedId={v.id.videoId} />
                                </div>
                            );
                        })
                }
            </div>
        </div>
    );
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top]

const topics = [
    "Math",
    "Science",
    "Computer Programming",
    "Art",
    "History",
];