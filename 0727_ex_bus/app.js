const express = require("express");

const fs = require("fs");

const socketIo = require("socket.io");

const app = express();

const exSeats = 
[
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1]
];

const HOUR = {
    ONE : 1,
    TWO : 2,
    THREE : 3
}

const hour = "hour";

const busSeat = {
    hour1 : {hour : 1, arr : []},
    hour2 : {hour : 2, arr : []},
    hour3 : {hour : 3, arr : []}
}

let seatNum = 1;
exSeats.map((line) => {
    const tmpArr1 = [];
    const tmpArr2 = [];
    const tmpArr3 = [];
    line.map((item) => {

        const tmpSeatNum = item != 0 ? seatNum : null;

        tmpArr1.push({ num : tmpSeatNum, state : item});
        tmpArr2.push({ num : tmpSeatNum, state : item});
        tmpArr3.push({ num : tmpSeatNum, state : item});

        if(item) seatNum++;
        
    });

    busSeat.hour1.arr.push(tmpArr1);
    busSeat.hour2.arr.push(tmpArr2);
    busSeat.hour3.arr.push(tmpArr3);
});

const PORT = 4000
const server = app.listen(PORT, () => {
    console.log(`${PORT}번 포트 대기 중...`);
});

const io = socketIo(server);

app.get("/", (req, res) => {
    fs.readFile("page.html", (err, file) => {
        // console.log(busSeat);
        res.send(file.toString());
    })
});

app.get("/seats/:hour", (req, res) => {
    // console.log(busSeat[hour+req.params.hour]);
    res.send(busSeat[hour+req.params.hour]);
});

io.sockets.on("connection", (socket) => {
    socket.on("reserve", (data) => {
        busSeat[hour+data.hour].arr[data.y][data.x].state = 2;
        console.log(busSeat[hour+data.hour].arr[data.y][data.x].state);
        io.sockets.emit("reserve", data);
    });
});

