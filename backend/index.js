const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);
const path = require('path');

const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../frontend', 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend','build', 'index.html'));
});


const users = {};
const chatLog = [];

io.on("connection", (socket) => {
    console.log("a client connected");

    socket.on("join chat", (user) => {
        users[user.id] = {
            name: user.profile.data.email,
            id: user.id
        };
        io.emit("user change", Object.values(users));
        let msg = {
            content: `${users[user.id].name.split("@")[0]} has joined the chat.`,
            user: {
                id: null,
                name: "SERVER"
            },
            time: Date.now()
        }
        io.emit("chat message", msg);
        chatLog.forEach(m => socket.emit("chat message", m));
    });

    socket.on("chat message", (data) => {
        let msg = {
            time: Date.now(),
            user: users[data.user.id],
            content: data.content
        }
        io.emit("chat message", msg);
        chatLog.push(msg);
    });

    socket.on("leave chat", (user) => {
        let msg = {
            content: `${users[user.id].name.split("@")[0]} has left the chat.`,
            user: {
                id: null,
                name: "SERVER"
            },
            time: Date.now()
        }
        io.emit("chat message", msg);
        delete users[user.id];
        io.emit("user change", Object.values(users));
    });

});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});