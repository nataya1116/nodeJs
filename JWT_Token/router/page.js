const express = require("express");

const PORT = 3000;
// 라우터 저장
const router = express.Router();
const fs = require("fs");


router.get('/', (req,res) => {
    fs.readFile('view/page.html', "utf-8", (err, page) => {
        console.log(err);
        res.send(page);
    })
});

// 설정한 라우터 내보내기
// require 함수를 사용하며 모듈처럼 사용할 수 있음
module.exports = router;