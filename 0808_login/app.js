const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const fs = require("fs");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// 호출해서 config()함수를 사용하면 process에서 사용할 수 있다.
require("dotenv").config();

const PORT = 4000;
const app = express();

app.use(express.static('public'));

app.use(session({
    // 세션을 발급받을 때 사용되는 키(소스코드 노출 조심)
    secret : process.env.SECRET,
    // 세션 저장하고 불러올 때 다시 저장할지 
    resave : false,
    // 세션 저장시 초기화 여부
    saveUninitialized : true,
    // 저장소를 만들지 여부(개발할 때만 사용) FileStore를 사용하면 session 폴더가 생기며 세션 정보가 저장된다.
    // store : new FileStore()
}));

app.use(bodyParser.urlencoded({
    extended : false
}));

const router = express.Router();

app.use(router);

app.listen(PORT, () => {
    console.log(PORT,"번 포트 대기 중...");
});

router.get("/", (req, res) => {
    console.log("/",req.session.key);

    const token = req.session.key;
    const key = process.env.KEY;
    
    if(!token) {
        console.log("세션이 없음");
        return res.redirect("/login");
    }else{
        let decoded;
        try {
            decoded = jwt.verify(token, key);
        } catch (error) {
            console.log(error);
            return;
        }
        // const decoded = jwt.decode(token);
        console.log(decoded);
        console.log(decoded.id);         
        fs.readFile("index.html", "utf-8", (err, page) => {
            const render = ejs.render(page, {id : decoded.id});
            return res.send(render);
        });
    }
});

router.get("/login", (req, res) => {
    fs.readFile("login.html", "utf-8", (err, file) => {
        res.send(file);
    })
});

router.post("/login", (req, res) => {

    const loginArr = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    const id = req.body.id;
    const pw = req.body.pw;

    if(!isUser(loginArr, id, pw)) res.redirect("/login");
    
    if(!req.session.key){
        const key = process.env.KEY;
        const token = jwt.sign(
            {
                type : "JWT",
                id,
            },
            key,
            {
                expiresIn : "10m",
                issuer : "user"
            }
        )
        req.session.key = token;
    }
    // console.log("/login",req.session.key);
    res.redirect("/");

    // console.log(res);
});


function isUser(loginArr = [], id, pw) {
    return loginArr.some(item => item.id == id && item.pw == pw);
}
