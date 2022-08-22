
// express ejs path
// path : 기본 경로를 다룰 수 있게 도와주는 모듈

const express = require("express");

const ejs = require("ejs");

const path = require("path");

// exports를 객체로 보내면 받을 때도 객체 형태로 받아야 한다.
const { sequelize, User, Post } = require("./model");

const fs = require("fs")

const app = express();

const PORT = 3000;

// path.join() 함수는 매개별수를 받은 문자열들을 주소처럼 합쳐준다.
// path.join('a', 'b') => a/b 주소처럼 만들어줌
// app2.js가 있는 위치 __dirname
// views 폴더까지의 경로가 기본값 렌더링할 파일을 모아둔 폴더
// app.set express에 값을 저장가능 밑에 구문은 views 키에 주소값 넣은 부분
app.set('views', path.join(__dirname,'view'));
// console.log(app);

// 랜더링하는 기본 엔진은 ejs처럼 사용한다고 설정한다.
// app.engine('파일의 타입', ejs.renderFile) htmldml 뷰 엔진을 ejs 랜더링 방식으로 바꾼다.
// ejs를 안 사용해도 된다.
app.engine("html", ejs.renderFile);

// 뷰 엔진 설정을 html을 랜더링 할 때 사용하겠다.
app.set('view engine', 'html');
// set() express에 값 추가 또는 수정

app.use(express.urlencoded({extended:false}))

// 시퀄라이즈 구성 연결 및 테이블 생성 sync 함수는 데이터베이스 동기화하는 사용하며 필요한 테이블을 생성해준다. 필요한 테이블들이 다 생기고 매핑되므로 어긋날 일이 없다.
// 여기서 CREATE TABLE sql문이 실행된다.
// force 강제로 초기화 시킬 것인지 (테이블 내용 다 삭제할 것인지)
sequelize
.sync({force : false})
// .sync({force : true})
.then(() => {
    console.log("연결되었습니다.");
})
.catch((err) => {
    console.error(err);
});


app.listen(PORT, () => {
    console.log(PORT,"번 포트 대기 중");
});

app.get("/", (req,res) => {
    res.render('create');
});

app.post('/create', (req,res) => {
    const {name, age, msg} = req.body
    // create()함수를 사용하면 해당 테이블에 컬럼을 추가할 수 있다. 
    const create = User.create({
        name,
        age,
        msg
    });
    // 위의 객체를 전달해서 컬럼을 추가할 수 있다.
    // 자바스크립트 구문으로 SQL 동작을 시킬 수 있다.
    // 쿼리문을 안짜도 된다.
});

app.get('/user', (req,res) => {
    // 추가된 유저 전체 조회
    // findAll
    User.findAll({})
    // 데이터를 가져오는대 시간이 걸리므로 비동기 처리
    .then((e) => {
        res.render('page', {data : e});
    })
    .catch((err) => {
        // 실패하면 에러 페이지를 보여주면 된다.
        res.render(err);
    })
});

app.post('/create_post', (req, res) => {
    const { name, text } = req.body;
    console.log( name, text );
    // Post와 User 테이블은 연결되어 있음 User id, Post user_id

    User.findOne({
        where : {
            name
        }
    })
    .then((data) => {
        Post.create({
            msg : text,
            // foreignKey로 연결 설정
            user_id : data.id
        })
    })
});