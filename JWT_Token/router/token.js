// jwt, express, router
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const fs = require("fs");

const dot = require("dotenv");
dot.config();

const secretKey = process.env.SECRETKEY;

router.post("/login", (req, res) => {
    const name = "jin";
    const token = jwt.sign({
        type : "JWT",
        name
    },
    secretKey,
    {
        // 유효 시간
        expiresIn : "5m",
        // 토큰 발급자
        issuer : "jin"
    }
    );
    req.session.token = token;
    const tmp = {
        msg : "토큰 발급",
        token
    }
    fs.readFile("view/page2.html", "utf-8", (err , page) => {
        res.send(page);
    })
    
});

module.exports = router;