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
import { useTopics } from "../hooks/useTopics";

const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'API_KEY';

const cardData = [
    {
        name: "Robert",
        description: "Calculus talk.",
        tutorCount: "5",
        studentCount: "10",
        lang: "GB",
        topics: [
            'Science', "Math"
        ]
    },
    {
        name: "Jenelle",
        description: "Basics of functional programming.",
        tutorCount: "5",
        studentCount: "10",
        lang: "CA",
        topics: ["Computer Programming", "Science"]
    },
    {
        name: "Tim",
        description: "Discussing life in ancient Rome.",
        tutorCount: "5",
        studentCount: "10",
        lang: "US",
        topics: ["History"]
    }
];

export function Dashboard(props) {
    const { loading, todos, ...todoActions } = useTodos();
    const { draftTodos, ...draftTodoActions } = useDraftTodos();
    const [userTopics, setUserTopics] = useState([]);
    const [roomCards, setRoomCards] = useState([]);
    const { topics } = useTopics();
    const showLoader = useShowLoader(loading, 200);
    const [suggestedVideos, setSuggestedVideos] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState(cardData);

    useEffect(() => {
    }, []);

    const handleSelection = (value) => {
        setUserTopics(value);
        let rooms = value.length === 0 ? cardData : cardData.filter(r => {
            let mutual = false;
            for (const t of r.topics) {
                if (value.includes(t))
                    mutual = true;
            }
            return mutual;
        });
        setFilteredRooms(rooms);
        if (value.length > 0) {
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${value.join(';')}&key=${YOUTUBE_KEY}`)
                .then((res) => res.json())
                .then((res) => {
                    let items = (res.items || []).slice(0, 5);
                    setSuggestedVideos(items);
                });
        }
    }

    return (
        <div style={{ margin: '10px' }}>
            {
                userTopics.length === 0 ?
                    <h1>Search a topic to get started.</h1> : null
            }

            <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={topics.map(t => t.name)}
                onChange={(event, value) => handleSelection(value)}
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
                    filteredRooms.length === 0 ?
                        <div>Sorry, it looks like there are no active rooms on this topic right now.</div>
                        :
                        filteredRooms.map((card) => {
                            return <RoomsCard key={card.name} {...card}></RoomsCard>
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


// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top]

// const topics = [
//     "Math",
//     "Science",
//     "Computer Programming",
//     "Art",
//     "History",
// ];