const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const dot = require("dotenv");

// dotenv를 사용하기 위해 사용하는 함수
dot.config();

const secretKey = process.env.SECRETKEY;

// app.use("/userView", verfity) "/userView" 요청일 때 밑에꺼 처리
router.post("/", (req,res) => {
    const token = req.session.token;
    // 유효한 토큰이면 콜백으로 decode를 받을 수 있다. 
    jwt.verify(token, secretKey, (err, decode) => {
        if(err) {
            console.error(err);
        }
        console.log(decode);
        res.send(decode);
    });
});

module.exports = router;