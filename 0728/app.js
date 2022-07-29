// 채팅방 만들기
// 방 개념

// 사용할 모듈
// express, socket.io, fs, nodemon

const express = require("express");
const socketIo = require("socket.io");
const fs = require("fs");

const app = express();
const PORT = 3000;
const server = app.listen(PORT, ()=>{
    console.log(`${PORT}번 포트 대기 중`);
});

app.get("/", (req, res) => {
    fs.readFile('page.html', 'utf-8', (err, file)=> {
        if(err) console.error(err);

        res.send(file.toString());
    })
})

const io = socketIo(server);

io.on("connection", (socket) => {
    console.log(socket);
    console.log("유저 접속");
    socket.on("joinRoom", (room, name) => {
        // join("방 이름") 방 개념으로 접속을 시켜주는 함수
        socket.join(room);
        // to(room) 현재 그 방에 있는 클라이언트에게 요청
        io.to(room).emit("joinRoom", room, name);
    });

    socket.on("leaveRoom", (room, name) => {
        // 방 개념으로 접속해제하게 해주는 함수
        socket.leave(room);
        io.to(room).emit("leaveRoom", room, name);
    })

    socket.on("chat", (room, name, msg) => {
        io.to(room).emit("chat", name, msg);
    });
});

// 접속된 모든 클라이언트에게 메세지를 전송
// io.emit("이벤트명", 콜백함수)

// 메세지를 전송한 클라이언트에게만 메세지 전송
// socket.emit("이벤트명", 콜백함수)

// 본인 제외 메세지 전송
// socket.broadcast.emit("이벤트명", 콜백함수)

// 특정 클라이언트에게 전송
// io.to("소켓아이디").emit("이벤트명", 콜백함수)

// 클라이언트 접속
// io.on("connection", 콜백함수)

// 클라이언트 접속 해제
// io.on("disconnection", 콜백함수)