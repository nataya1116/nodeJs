// 영화관 예매

const socketIo = require("socket.io");
const express = require("express");
const fs = require("fs");

// 영화관 자리 배열 1은 빈자리, 0은 빈공간, 2는 예약됨
const seats = [
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  ];
  
// 웹서버 생성
const app = express();
const PORT = 3000;
const server = app.listen(PORT, ()=>{
    console.log(`포트 ${PORT}번 대기 중`);
});

// 웹소켓 생성
const io = socketIo(server);

app.get("/", (req, res) => {
    fs.readFile('page.html', (err, file) => {
        res.send(file.toString());
    })
});

app.get("/seats", (req, res) => {
    res.send(seats);
});

io.sockets.on("connection", (socket) => {
    socket.on("reserve", (data) => {
        seats[data.y][data.x] = 2;
        // 전체 메세지
        io.sockets.emit("reserve", data);
    });
}); 