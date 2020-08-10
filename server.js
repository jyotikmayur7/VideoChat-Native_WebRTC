const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer();
const socket = require('socket.io');
const io = socket(server);


const rooms = {};

io.on('connection', socket => {
    socket.on('join room', roomId => {
        if (rooms[roomId]) {
            rooms[roomId].push(socket.id);
        } else {
            romms[roomId] = [socket.id];
        }

        const otherUser = rooms[roomId].find(id => id !== socket.id);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }
    })
})

server.listen(8000, () => console.log('Server is running on port 8000'));