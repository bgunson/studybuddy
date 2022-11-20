import React, { useState, useEffect } from "react";
import {
    Container,
    Button,
    Grid,
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
import YoutubeEmbed from "../components/YoutubeEmbed";

const YOUTUBE_KEY = 'API_KEY';
const query = 'math;calculus';

export function DashboardPage() {
    const { loading, todos, ...todoActions } = useTodos();
    const { draftTodos, ...draftTodoActions } = useDraftTodos();
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
