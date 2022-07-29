// 채팅방 만들기
// 방 개념

// 사용할 모듈
// express, socket.io, fs, nodemon

const express = require("express");
const socketIo = require("socket.io");
const fs = require("fs");

const app = express();
const PORT = 3000;
let users = [];
const server = app.listen(PORT, ()=>{
    console.log(`${PORT}번 포트 대기 중`);
});

app.get("/", (req, res) => {
    fs.readFile('page.html', 'utf-8', (err, file)=> {
        if(err) console.error(err);

        res.send(file.toString());
    })
});

const io = socketIo(server);

io.on("connection", (socket) => {

    socket.on("joinRoom", (room, name) => {
        const id = socket.id;
        const user = { id, name };

        // 로그인 체크
        const isLogin = loginUser(users, user);

        // 중복 확인
        const isOverlap = checkOverlapUser(users, user);

        // 계정이 없으면서 중복
        if(!isLogin && isOverlap){
            io.to(id).emit("joinRoom", false, name);
            return;
        } 

        if(!isLogin) insertUser(users, user);

        socket.join(room);
        // to(room) 현재 그 방에 있는 클라이언트에게 요청
        console.log(users);

        // 전체 유저 목록 업데이트
        io.emit("usersUpdate", users);

        io.to(room).emit("joinRoom", room, name);
        
        // 유저 네임 전달
        socket.emit("login", name);
    });

    socket.on('disconnect',()=>{
        const id = socket.id;
        users = deleteUser(users, id);
        console.log("delete");
        console.log(users);

        // 유저가 삭제되었으므로 유저목록 업데이트
        io.emit("usersUpdate", users);
    });

    socket.on("leaveRoom", (room, name) => {
        // 방 개념으로 접속해제하게 해주는 함수
        socket.leave(room);
        io.to(room).emit("leaveRoom", room, name);
    });

    socket.on("chat", (room, name, msg) => {
        io.to(room).emit("chat", name, msg);
    });

    socket.on("whisper", (name, msg) => {
        const user = searchNameUser(users, name);
        console.log();
        io.to(user.id).emit("whisper", msg);
    });

    socket.on("usersUpdate", () => {
        io.emit("usersUpdate", users);
    });
});

// 접속된 모든 클라이언트에게 메세지를 전송
// io.emit("이벤트명", 매개변수)

// 메세지를 전송한 클라이언트에게만 메세지 전송
// socket.emit("이벤트명", 매개변수)

// 본인 제외 메세지 전송
// socket.broadcast.emit("이벤트명", 매개변수)

// 특정 클라이언트에게 전송
// io.to("소켓아이디").emit("이벤트명", 매개변수)

// 클라이언트 접속
// io.on("connection", 콜백함수)

// 클라이언트 접속 해제
// io.on("disconnection", 콜백함수)

function insertUser(users, user){
    users.push(user);
}

function loginUser(users, user){
    return users.some(el => el.name === user.name && el.id === user.id);
}

function checkOverlapUser(users, user){
    return users.some(el => el.name === user.name );
}

function deleteUser(users, id) {
    return users.filter(el => el.id !== id);
}

function searchNameUser(users, name) {
    return users.find(el => el.name === name);
}

