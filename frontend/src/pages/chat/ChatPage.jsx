import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client";
import { useRealmApp } from "../../components/RealmApp";
import { Chip } from "@material-ui/core";
import { Button } from '@mui/material';
import "./chat.css";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';


let socket = null;

export function ChatPage() {
    const { currentUser } = useRealmApp();
    const canvasRef = React.createRef();
    const [messages, setMessages] = useState([]);
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [msgInput, setMsgInput] = useState("");
    // const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (socket == null) {
            socket = socketIOClient(window.location.origin, { transports: ['websocket'] });
        }
        socket.emit("join chat", currentUser);
        socket.on("chat message", (data) => {
            let temp = messages;
            temp.push(data)
            setMessages([...temp]);
            const el = document.getElementById('chat-feed');
            el.scrollTop = el.scrollHeight;
        });
        return () => {
            socket.emit("leave chat", currentUser);
            socket.off("chat message");
        }

    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (msgInput) {
            socket.emit("chat message", {
                content: msgInput,
                user: currentUser
            });
            setMsgInput("");
        }
    }

    const canvasStyles = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
    };


    let users = [
        {
            name: "User 1",
            displayPicture: "https://i.pravatar.cc/150?img=1",
        },
        {
            name: "User 2",
            displayPicture: "https://i.pravatar.cc/150?img=2",
        },
        {
            name: "User 3",
            displayPicture: "https://i.pravatar.cc/150?img=3",
        },
        {
            name: "User 4",
            displayPicture: "https://i.pravatar.cc/150?img=4",
        },
        {
            name: "User 5",
            displayPicture: "https://i.pravatar.cc/150?img=5",
        }
    ]

    function DisplayAllUsers() {
        return users.map((user) => {
            return (
                <Avatar alt = {user.name} src={user.displayPicture} style={{margin:1.5}} />
            )
        })
    }

    return (
        <div className="parent-container">
            <div className="chat-container">
            <div className="avatars" style={{display: "flex"}}>
                <DisplayAllUsers />
            </div>    

                    <div className="messages" id="chat-feed">
                        {
                            messages.map(msg => {
                                if (msg.user.id == currentUser.id) {
                                    return (
                                        <div className="chat-message message-right">
                                            <Chip className="chat-chip" color="primary" label={msg.content} /><br />
                                            <small>{new Date(msg.time).toLocaleTimeString()}</small>
                                        </div>
                                    );
                                } else if (msg.user.id == null && msg.user.name == "SERVER") {
                                    return (
                                        <div className="chat-message" style={{ textAlign: "center" }}>
                                            {msg.content}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="chat-message">
                                            <small>{msg.user.name.split('@')[0]}</small><br />
                                            <Chip color="secondary" label={msg.content}></Chip><br />
                                            <small>{new Date(msg.time).toLocaleTimeString()}</small>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                    <form className="chat-form" action="" onSubmit={sendMessage}>
                        <input className="chat-input" autocomplete="off" placeholder="Type to chat with others..." value={msgInput} onChange={e => setMsgInput(e.target.value)} /><button style={{cursor: "pointer"}}>Send</button>
                    </form>
            </div>



            <ReactSketchCanvas
                ref={canvasRef}
                style={canvasStyles}
                width="70%"
                height="calc(100% - 64px)%"
                strokeWidth={4}
                strokeColor={strokeColor}
                backgroundImage="https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg"
            />

            <Stack className="button-container" direction="column" spacing={3} margin={4}>
            <Button onClick={() => { canvasRef.current.undo()}} variant="contained">Undo ↩</Button>
                <Button onClick={() => { canvasRef.current.redo()}} variant="contained" >Redo ↪</Button>
                <Button onClick={() => { canvasRef.current.eraseMode(true)}} variant="contained">Eraser 🧹 </Button>
                
                <Button onClick={() => { canvasRef.current.eraseMode(false)}} variant="contained">Pen 🖊️ </Button>
                <Button onClick={() => { canvasRef.current.clearCanvas()}}  variant="contained" color="error" >Clear 🗑️</Button>
                <div className = "color-button-container" direction="row" style={{width:110}}>
                    <button className={strokeColor === 'red' ? 'is-active color-button' : 'color-button'} id="red" onClick={() => {setStrokeColor("red"); }}>  </button>
                    <button className={strokeColor === 'black' ? 'is-active color-button' : 'color-button'} id="black" onClick={() => {setStrokeColor("black")}}> </button>
                    <button className={strokeColor === 'green' ? 'is-active color-button' : 'color-button'} id="green" onClick={() => {setStrokeColor("green")}}> </button>
                    <br></br>
                    <button className={strokeColor === 'blue' ? 'is-active color-button' : 'color-button'} id="blue" onClick={() => {setStrokeColor("blue")}}> </button>
                    <button className={strokeColor === 'orange' ? 'is-active color-button' : 'color-button'} id="orange" onClick={() => {setStrokeColor("orange"); }}>  </button>
                    <button className={strokeColor === 'purple' ? 'is-active color-button' : 'color-button'} id="purple" onClick={() => {setStrokeColor("purple"); }}>  </button>

                </div>
            </Stack>




        </div>


    );
}