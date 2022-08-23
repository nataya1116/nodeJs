
const express = require('express');
const app = express();

app.listen(8080, ()=>{
    console.log('8080 포트 대기 중');
})

app.get('/', (req, res) => {
    // res.send('여기는 나의 작업용 페이지입니다.');
    res.sendFile(__dirname + '/idx.html');
});


app.get('/about', (req, res) => {
    res.send('어바웃미.');
})