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

// database : 'test4' = test4 이름의 데이터 베이스를 사용하겠음
// query 함수의 첫번째 매개변수는 쿼리문을 입력해주고 두번째 매개변수는 콜백 함수 매개변수는 첫번째 쿼리 에러, 두번째 쿼리 결과

// 프로덕트 테이블의 값을 불러오되 테이블이 없어서 오류가 나면 테이블을 생성해준다.
temp.query("select * from products", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
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

  // 요청된 url 확인
  // req.url
  const URL = req.url;

  // res.setHeader()헤더 정보를 설정할 수 있다.
  // utf-8로 한글이 처리되도록 설정해준다.
  res.setHeader("Content-Type", "application/json", "charset=utf-8");
  switch (URL) {
    case "/":
      res.end("메인 페이지");
      break;
    case "/list":
      temp.query("SELECT * FROM products", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // data에는 procuts 테이블의 안의 컬럼 내용
          res.end(JSON.stringify(data));
        }
      });
      break;
    case "/add":
      // ?는 쿼리문 안의 옵션으로 사용 할 수 있음
      // 두번째 배열 타입의 매개변수로 값을 넣어 줄 수 있다.

      // eslint-disable-next-line no-case-declarations
      const sql = "INSERT INTO products (name, number,series) VALUES(?,?,?)";
      temp.query(sql, ["이름", 123, 124]);
      break;
    case "/shop":
      res.end("상점 페이지");
      break;

    case "/mypage":
      res.end("마이 페이지");
      break;

    default:
      break;
  }

  console.log(URL);
  // 요청된 method 확인

  // html에 문자열을 입력해주는 함수(html 요소도 가능)
  // res.write("123");

  // 종료 함수 write와 마찬가지로 html에 문자열을 입력해준다.
  // res.end("456");
});

const PORT = 3000;

//  server 객체에 listen()함수를         , 사용하면 서버가 실행된다.
//            포트번호, 호스트명, 백로그, 콜백함수
server.listen(PORT, () => {
  console.log(`port : ${PORT}`);
});
