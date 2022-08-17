// 로그인 구현

// express, dotenv, fs, jsonwevtoken, express-session, mysql2
// nodemon




const fs = require("fs");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const express = require("express");

const session = require("express-session");

const mysql = require("mysql2");

const conn = mysql.createConnection({
    user:"root",
    password:"1234",
    database:"test7",
    // 다중 쿼리문 옵션
    multipleStatements:"true"
});

const app = express();

// 바디(post 데이터를 가지고 있음) 객체 사용 설정 express 12버전 부터 bodyParser없이 설정 만으로 사용 가능
app.use(express.urlencoded({extended:false}));

app.use(session({
    // 세션 발급할 때 사용되는 키
    secret: "sdfgasdg",
    // 저장된 세션을 불러올 때 다시 저장할지 여부
    resave:false,
    // 세션 저장 시 초기화 여부
    saveUninitialized:true
}));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(PORT, "번 포트 대기 중");
});

app.get("/", (req, res) => {
    fs.readFile("view/login.html", 'utf-8', (err, page) => {
        res.send(page);
    });
});

// const sql = 'create table users ( ind INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), password VARCHAR(255), refresh VARCHAR(255))';
// conn.query(sql);

app.post('/join', (req, res) => {
    const id = req.body.user_id;
    const pw = req.body.user_pw;
    const sql = "INSERT INTO users ( user_id, password ) VALUES ( ?, ? )";
    conn.query(sql, [id, pw], () => {
        res.redirect("/");
    });
    
})

app.get('/join', (req, res) => {
    fs.readFile('view/join.html', 'utf-8', (err, page) => {
        res.send(page);
    })
});

app.post('/login', (req,res) => {
    const id = req.body.user_id;
    const pw = req.body.user_pw;

    const sql = "SELECT * FROM users WHERE user_id = ?";
    conn.query(sql, [id], (err, result) => {
        if(err){
            console.error(err);
            res.send(err);
        }else {
            // ? 구문 뒤에 키를 작성하면 값이 있는지 판단해서 있을 경우에만 값을 가져온다. 키 값이 없어서 오류가 나는 것을 방지한다.
            if(result[0] && pw === result[0]?.password){
                // 로그인 성공 토큰 발급

                const accessToken = jwt.sign({
                    userId : result[0].user_id
                },
                process.env.ACCESS_TOKEN,
                {
                    expiresIn:"5s"
                });

                const refreshToken = jwt.sign({
                    userId: result[0].user_id,
                    email:"email.com"
                },
                process.env.REFRESH_TOKEN,
                {
                    expiresIn:"1m"
                });

                const sql = "UPDATE users SET refresh = ? WHERE user_id = ? ";
                conn.query(sql, [refreshToken, id]);

                // 세션에 토큰 값 할당
                req.session.access_token = accessToken;
                req.session.refresh_token = refreshToken;

                res.send({ access : accessToken, refresh : refreshToken });
            }else{
                res.send("계정 없음");
            }
        }
    })
});

// 미들웨어란
// 로그인을 해서 어서오세요 환영합니다. 로그인이 유지되어 있는 페이지에 접속하고 로그인이 유지되고 있는 동안에만 동작해야 하는 페이지들이 있는대 로그인 유지를 확인하고 요청을 보내야 한다.
// 간단하게 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하는 중간(미들)의 목적에 맞게 처리해주는 중간단계를 통과하는 미들웨어 함수이다. 요청의 응답에 도달하기 위해서 미들웨어를 통과해야지 응답까지 도달 할 수 있다. 중간의 문지기라고 생각하면 된다.
// req(요청), res(응답) 객체, next() 함수를 이용해서 통과 요청을 넘길 수 있다. 함수명대로 조건에 맞아야만 통과하게 해준다. 요청을 처리하기 전에 중간에 기능을 동작시켜주는 친구

                //  요청객체, 응답객체, next 함수
const middleware = (req    , res    , next) => {
    const accessToken = req.session.access_token;
    const refreshToken = req.session.refresh_token;
    // accessToken 값을 먼저 검증한다.
    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, accDecode) => {
        // 유효하지 않은 토큰
        if(err){
            // 로그인 페이지로 넘기거나, 404, 500 에러 페이지를 만들어서 보여준다던지 페이지 구성을 하면된다.
            // res.send("다시 로그인 해주세요.");
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, refDecode) => {
                if(err){
                    res.send("다시 로그인 해주세요.");
                } else {
                    const sql = "SELECT * FROM users WHERE user_id = ?";
                    conn.query(sql, [refDecode.userId], (err, result) => {
                        if(err){
                            res.send(err);
                        } else {
                            // 리프레쉬 토큰 있는지 확인
                            if(result[0]?.refresh == refreshToken){
                                const accessToken = jwt.sign({
                                    userId : refDecode.userId
                                },
                                process.env.REFRESH_TOKEN,
                                {
                                    expiresIn: "5s"
                                });
                                req.session.access_token = accessToken;
                                // 다음 콜백함수 실행. 현재 코드에서 next()를 호출하지 않으면 요청에 대한 처리를 하지 않게 된다.
                                // next(); 
                                console.log("새로 발급");
                                next();
                            }else{
                                res.send("다시 로그인 해주세요.");
                            }
                        }
                    })
                }
            });
        }else{
            // console.log(accDecode);
            if(accDecode){
                // 리프레쉬 토큰 만료 여부 확인
                next();
            } else {
                next();
            }

            // 리프레쉬 포트

        }
    })
};

// middleware이 미들웨어 함수에서 next() 함수를 사용하지 않으면 다음 콜백함수를 실행되지 않는다. next() 함수를 호출하면 다음 콜백으로 이동해서 요청 및 응답 작업 동작으로 한다.
// 로그인이 되어 있는 페이지만 요청과 응답을 할 수 있게 처리한 것이다.
app.get('/check', middleware, (req, res) => {
    res.send("로그인되어 있음");
})