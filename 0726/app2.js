const { Socket } = require("dgram");
const express = require("express");
const fs = require("fs");
const socketio = require("socket.io");

const app = express();

const PORT = 3000;
const server = app.listen(PORT, (req, res) => {
    console.log(`포트 ${PORT}번 대기 중`);
})

const io = socketio(server);

app.get('/', (req, res) => {
    fs.readFile('page2.html', (err, file) => {
        res.end(file);
    });
});

// 클라이언트가 접속핼을때
// io.sockets.on('connection');


// 클라이언트가 종료했을때
// io.sockets.on('disconnection');

io.sockets.on('connection', (socket) => {
    socket.on("message", (data) => {

        // 받은 데이터 전체 전달
        io.sockets.emit("message", data);
    })
});