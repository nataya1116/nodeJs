// express 서버 구성이 쉬운 웹 서버 모듈
const express = require("express");
// ejs는 node.js와 express에서 많이 사용하고 있는 템플릿엔진 ejs는 우리가 쓰는 기존 html 문법을 사용하면서 <% %> 문법을 사용하여 노드 js의 데이터를 사용할 수 있다
const ejs = require("ejs");
// fs는 서버의 파일 읽기 쓰기를 할 수 있는 node.js 기본 내장 모듈이다.
const fs = require("fs");
const mysql = require("mysql2");
// body-parser는 요청과 응답 사이에서 공통적인 기능을 해주는 미들웨어이다. html 데이터를 body라는 객체 안에 담아서 요청 응답을 받을 수 있게 해준다. node.js 기본 내장 모듈이다. form 태그의 input name 요소가 키 value가 값이다.
const bodyParser = require("body-parser");

console.log(ejs);
const conn = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "test5",
});

// express 함수를 실행해서 반환 값을 담아줌
const app = express();

// extended의 옵션 true express 기본 내장 쿼리 스트링 모듈 사용
// extended의 옵션 false 쿼리 스트링 모듈의 기능이 좀 더 확장된 qs 모듈을 사용한다.
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const PORT = 4000;

// http는 메소드로 get과 post 등을 구분하지만 익스프레스는 함수 단위로 지원이 되서 구현하기가 훨씬 수월하다.
// app.get()
// app.post()

app.get("/", (req, res) => {
  //   console.log(req);

  // http write랑 end 대신 send 하나로 해결할 수 있다.
  res.send("2111");
});

app.get("/list", (req, res) => {
  console.log(req);

  // fs 모듈로 파일을 읽어 온다. 첫번째 매개변수는 경로 이름
  fs.readFile("src/list.html", "utf-8", (err, data) => {
    conn.query("select * from products", (_err, result) => {
      if (_err) {
        const sql =
          "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
        conn.query(sql);
        console.log(_err);
      } else {
        console.log(result);
        // render()함수로 불러온 파일을 그려준다.
        const render = ejs.render(data, { data: result });
        res.send(render);
      }
    });
  });
});

app.get("/insert", (req, res) => {
  fs.readFile("src/insert.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/insert", (req, res) => {
  const data = req.body;
  console.log(data);
  const sql = "INSERT INTO products (name, number, series) VALUES (?,?,?)";
  conn.query(sql, [data.name, data.number, data.series], (err, result) => {
    if (err) console.log(err);
    // redirect 페이지 이동
    else if (result) {
      res.redirect("/list");
    }
  });
});

app.post("/delete", (req, res) => {
  const data = req.body;
  console.log(data);
  const sql = "DELETE FROM products WHERE id = ?;";
  conn.query(sql, [data.id], (err, result) => {
    if (err) console.log(err);
    // redirect 페이지 이동
    else if (result) {
      res.redirect("/list");
    }
  });
});

app.listen(PORT, () => {
  console.log("server start");
});
