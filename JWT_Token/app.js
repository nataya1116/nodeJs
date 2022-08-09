const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const fs = require("fs");
const bodyParser = require("body-parser");
const dot = require("dotenv");
const jwt = require("jsonwebtoken");

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
    console.log(PORT,"번 포트 대기 중...");
});

app.use(
    bodyParser.urlencoded({
    extended : false
}));

app.use(
    session({
        // 세션을 발급받을 때 사용되는 키(소스코드 노출 조심)
        secret :"hdafgd",
        // 세션 저장하고 불러올 때 다시 저장할지 
        resave : false,
        // 세션 저장시 초기화 여부
        saveUninitialized : true,
        // 저장소를 만들지 여부(개발할 때만 사용) FileStore를 사용하면 session 폴더가 생기며 세션 정보가 저장된다.
        store : new FileStore()
    })
)

app.get("/", (req, res) => {
    if(!req.session.key) {
        req.session.key = "sgagwaer";
    }
    res.send(`key:${req.session.key}`);
});

app.post("/shop", (req, res) => {
    res.send(`난 숍 ${req.session.key}`);
})

