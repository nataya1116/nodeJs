const express = require("express");

const fs = require("fs");

const socketIo = require("socket.io");

const bodyParser = require("body-parser");

const ejs = require("ejs");

const app = express();

const exSeats = 
[
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1]
];

const hour = "hour";

const busSeat = {
    hour1 : {hour : 1, arr : []},
    hour2 : {hour : 2, arr : []},
    hour3 : {hour : 3, arr : []}
}

// let seatNum = 1;
// exSeats.map((line) => {
//     const tmpArr1 = [];
//     const tmpArr2 = [];
//     const tmpArr3 = [];
//     line.map((item) => {

//         const tmpSeatNum = item != 0 ? seatNum : null;

//         tmpArr1.push({ num : tmpSeatNum, state : item});
//         tmpArr2.push({ num : tmpSeatNum, state : item});
//         tmpArr3.push({ num : tmpSeatNum, state : item});

//         if(item) seatNum++;
//     });

//     busSeat.hour1.arr.push(tmpArr1);
//     busSeat.hour2.arr.push(tmpArr2);
//     busSeat.hour3.arr.push(tmpArr3);
// });

busSeat.hour1.arr = creatSeats(exSeats);
busSeat.hour2.arr = creatSeats(exSeats);
busSeat.hour3.arr = creatSeats(exSeats);
console.log(busSeat);

const PORT = 4000
const server = app.listen(PORT, () => {
    console.log(`${PORT}번 포트 대기 중...`);
});

const io = socketIo(server);

app.use(
    bodyParser.urlencoded({
      extended: false,
    })
);

app.get("/", (req, res) => {
    fs.readFile("login.html", (err, file) => {
        // console.log(busSeat);
        res.send(file.toString());
    })
});

app.get("/reserve", (req, res) => {
    res.redirect("/");
});

app.post("/reserve", (req, res) => {
    const nick = req.body.nick;
    if(nick == "") res.redirect("/");
    fs.readFile("page.html", "utf-8", (err, file) => {
        // console.log(busSeat);
        const render = ejs.render(file, { nick });
        res.send(render);
    })
});

app.get("/seats/:hour", (req, res) => {
    // console.log(busSeat[hour+req.params.hour]);
    res.send(busSeat[hour+req.params.hour]);
});

io.sockets.on("connection", (socket) => {
    socket.on("reserve", (data) => {
        busSeat[hour+data.hour].arr[data.y][data.x].state = 2;
        busSeat[hour+data.hour].arr[data.y][data.x].nick = data.nick;
        console.log(busSeat[hour+data.hour].arr[data.y][data.x]);
        io.sockets.emit("reserve", data);
    });
    socket.on("cancle", (data) => {
        busSeat[hour+data.hour].arr[data.y][data.x].state = 1;
        busSeat[hour+data.hour].arr[data.y][data.x].nick = null;
        console.log(busSeat[hour+data.hour].arr[data.y][data.x]);
        io.sockets.emit("cancle", data);
    })
});

function creatSeats(seatsArr) {
    const tmpArr = [[],[],[],[],[]];
    let num = 1;
    for (let xi = 0; xi < seatsArr[0].length; xi++) {
        for(let yi = 0; yi < seatsArr.length; yi++){

            const el = seatsArr[yi][xi];
            const tmpSeatNum = el != 0 ? num : null;
            
            tmpArr[yi][xi] = { num : tmpSeatNum, state : el,  nick : null};

            if(el) num++;
            
        }
    }
    return tmpArr;
}