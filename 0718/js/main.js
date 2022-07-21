// mysql 프로젝트에 연결

const mysql = require("mysql2");

// mysql에 연결 시켜주는 함수
// createConnection 함수는 옵션을 사용할 수 있다.
// host : 연결한 호스트를 나타냄
// port : 연결할 포트
// user : 사용자 이름
// database : 연결할 데이터베이스 이름
// debug : 디버그 모드를 사용할 것인지

const temp = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "test4",
});

temp.query("select content, id from posts", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

const http = require("http");

// http 객체 안의 createServer함수를 사용해서 서버를 만듦
// 서버가 되는 부분을 반환 받을 수 있다.
const server = http.createServer((req, res) => {
  // req 요청값
  // 404, 500 이런 오류 들
  req.statusCode = 200;
  // 100번대 : 정보응답
  // 200번대 : 성공응답
  // 300번대 : 리다이렉션 메세지, 요청한  url이 변경되었을때
  // 400번대 : 클라이언트 상의 오류, 클라이언트에 오류가 있을때
  // 500번대 : 서버 오류 응답, 서버에 오류가 있을때

  // html에 문자열을 입력해주는 함수(html 요소도 가능)
  res.write("123");

  // 종료 함수 write와 마찬가지로 html에 문자열을 입력해준다.
  res.end("456");
});

const PORT = 3000;

//  server 객체에 listen()함수를         , 사용하면 서버가 실행된다.
//            포트번호, 호스트명, 백로그, 콜백함수
server.listen(PORT, () => {
  console.log(`port : ${PORT}`);
});
