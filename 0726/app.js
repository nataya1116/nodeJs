// socket.io
// 웹 소캣과 클라이언트가 실시간 양방향 통신할 수 있게 도와준다. 실시간 웹을 위한 자바스크립트 라이브러리이다.

// 가상화폐 거래소 같은 데이터 전송이 많은 경우 저렴한 비용과 빠른 속도를 가진 표준 웹소캣을 사용하는 것이 좋다.(업비트, 아비낸스 소캣 API를 사용하면 데이터 양이 많다.)

// socket.id는 웹 소캣 프로토콜을 지원해주는 네트워킹 라이브러리이며 비동기 이벤트 방식으로 실시간으로 간단하게 데이터를 요청하고 받을 수 있다. 예를 들어 쇼핑몰에 고객센터 채팅 같은 것을 구현할 때 사용하기 적합하다.

// sokect.io에서 주로 쓰는 메서드
// on : 이벤트에 매칭해서 소켓 이벤트 연결
// emit :  소캣 이벤트 발생

// 같이 사용할 모듈
// express, fs, socket.io

const express = require("express");
const fs = require("fs");
const socketio = require("socket.io");

const app = express();

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(PORT, "번 포트 사용 중");
});

app.get('/', (req, res) => {
    fs.readFile("page.html", (err,file) => {
        res.end(file);
    });
});



// soketio() 매개변수는 express server

// 소켓 서버를 생성 및 실행
const io = socketio(server);
const userid = [];

// sokectio를 사용하여 연결한다.
// connection -> 클라이언트가 웹소캣 서버에 접속할때 발생한다 
io.sockets.on("connection", (socket) => {
    console.log("유저가 접속함.");
    userid.push(socket.id);
    console.log(userid);
    // on() 이벤트 함수 등록(여기는 서버 단이므로 서버에 이벤트 등록, 클라이언트 단(웹페이지)에서도 이벤트 등록 가능 둘 다 이벤트를 등록해야 양방향 통신이 가능하다.
    // emit() 실행할 부분 여기도 마찬가지로 서버와 클라이언트에 모두 등록해야 양방향 통신이 가능하다.
    socket.on("hi", (data) => {
        console.log(data,'에서 보낸 웹소켓 hi 이벤트가 실행');
        // socket.emit("hi", "웹 소켓에서 클라이언트로 보냄");
        // 모든 대상에게 발생
        // io.sockets.emit("hi", "모두에게");

        // 자기 제외 모든 대상 발행(방송)
        // socket.broadcast.emit("hi", "나 빼고 모두");

        // 비밀대화
        io.sockets.to(data.id).emit("hi", data.msg);
        console.log(socket);
    });
});