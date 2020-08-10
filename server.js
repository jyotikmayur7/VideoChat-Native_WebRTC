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

    // Sending offer from current user to other user
    socket.on("offer", payload => {
        io.to(payload.target).emit("offer", payload);
    })

    // Sending answer from other user to cuurent user
    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    })

    // Both candidates are sending thier ice-candidate for making sure both the users agree on some terms for peer to peer connection
    socket.on("ice-candidate", incoming => {
        it.to(incoming.target).emit("ice-candidate", incoming.candidate);
    })
})

server.listen(8000, () => console.log('Server is running on port 8000'));