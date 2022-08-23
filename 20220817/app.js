// crypto
// 암호화

// 단방향 양방향 암호 방식
// 단방향은 복호화해서 원래의 값을 알수 없고,
// 양방향은 복호화해서 원래의 값을 알수 있다.
// 단방향 복호화해서 원래의 비밀번호는 알수 없게하고
// 복호화해서 암호를 해독한다.

// 네이버같은 페이지만 봐도 비밀번호 찾기를 시도할시
// 비밀번호를 알려주지 않고 비밀번호 변경을 시켜준다.

// 복호화는 암호문을 편문으로 변환 하는 과정
// 부호화(인코딩)된 데이터를 부호화 되기 전 형태로 바꿔서 사람이
// 읽을수 있는 형태로 되돌려 놓는 것.

// 단방향 암호화가 요즘 사이트들이 비밀번호 찾기하면 비밀번호를
// 직접 알려주지 않고 비밀번호 변경을 하라고 하는데
// 굳이 복호화를 할 이유가 없기 때문에.

// 단방향의 비교 검증 방법
// 데이터 베이스에 저장된 암호화
// 로그인할때 입력받은 비밀번호를 단방향으로 암호화를 통해
// 비교를 하면 기존의 비밀번호는 저장되지 않고 암호화된 문자열로만
// 비교 시킨다.

// 단방향 암호화는 해쉬 알고리즘을 사용해서 문자열을 고정된 길이의
// 문자열로 암호화 시킨다.

// 4654648랑 1616841351617468545616 둘의 길이가 다른데
// 해쉬 알고리즘으로 길이를 정해놓으면 5자로한다 하면
// 둘다 5자의 문자로된 암호가 만들어진다.

// crypto 모듈 가져오기
const crypto = require("crypto");
// 임의의 비밀번호
const pw = "44566545";

// 단순 해싱으로 비밀번호 해싱
let hashAlgor = crypto.createHash("sha512");
// 사용할 해시 알고리즘은 sha512 암호 알고리즘을 쓸건데
// (md5, sha1, sha256, sha512 등이 있는데.)
// sha-512 알고리즘은 국가안보국(NSA)이 설계한 암호 해쉬함수이다.
// sha512sms 512비트(64바이트) 해시 값을 만들어주는데.
// 일반적으로 길이가 128자리인 16진수로 렌더링 된다.

// 선택된 알고리즘으로 해싱한다.
let hashing = hashAlgor.update(pw); // 매개변수로 암호화 시킬 문자열

// 보여줄 인코딩 설정
let hasString = hashing.digest("base64");
// 인코딩할 알고리즘을 넣어준것이 base64
// digest함수를 사용해서
// 해싱된 객체를 base64로 문자열로 반환해준다
// console.log(hasString);

// 왜 이렇게 하냐.. 알고리즘으로 암호화하면 해커가 뚫기 힘들게 하려고
// 지금 이렇게만 해쉬 알고리즘으로 암호화하면 같은 값이 들어가면
// 암호화된 문자열도 계속 같기 때문에 암호화의 효과가 좀 안좋다.

// 해커를 더 힘들게 하려면

// salt라는 기법 있어요.
// 소금 뿌린다.
// 암호화를 강하게 해준다.
// 해커를 귀찮게 한다.

// 복호화를 방해하기 위해서 단방향 암호화 salt를 소금 뿌리자.
// 해커의 복호화를 힘들게 하자
// 비밀번호에 추가 문자열을 덧붙여서
// 같은 비밀번호라도 암호화를 시키면 같은 해쉬 출력값을 가지고 있지 않도록 한다.

// salt 값은 항상 비밀번호에 매번 추가 시켜서 사용해야 하니까
// salt값을 잘 보관해놓고 숨겨놓자 .env

// 솔트 값을 만들어보자. 소금 생성
// 크립트의 랜덤바이트 생성 함수 랜덤한 바이트를 생성 시킬수 있다.
// 32바이트 이상이어야지 좀 짐작하기가 어렵다.
// randomBytes 함수가 랜덤한 바이트를 만들어주는 함수
// 매개변수 인자는 첫 매개변수가 바이트의 사이즈
// crypto.randomBytes(32, function (err, byte) {
//   // 32bit 길이의 랜덤한 byte 생성
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(byte);
//   }
// });

// 크립트의 randomBytes 함수로 salt값을 만들어서
// 데이터 베이스에 저장한 후
// 모든 패스워드가 고유의 salt값을 가지고 할수도 있다.

// 이 기법과 하나 더 해커를 화나게 할 수 있는 방법
// 키 스트레칭
// 키 스트레칭은 salt와 패스워드를 해시 함수에 넣는 과정을 반복시켜서 해커가
// 복호화 하는걸 화나게 하는 방법
// 계산량을 늘려서 값 출력을 임의적으로 느리게 만드는 방법

// pbkdf, scrypto, bcrypto 이 세가지 방법 있는데.
// bcrypto가 좀 좋고 핫해서 많이 사용한다.

// pbkdf
// 해시함수의 컨테이너 역활을 하고
// 해시함수에 salt를 적용해서 해시함수의 반복횟수를 지정해서
// 암호화 할수 있고 IOS 표준에 적합하며 NIST에서 승인된 알고리즘이다.

// scrypt
// 얘가 좀 쌘애인데.
// 강력은 하지만 많은 메모리와 CPU를 잡아먹어서
// 역효과가 날수 있다. 부하가 걸릴수 있다.
// 오프라인 공격에 많이 강력하지만 자원을 많이 써서 위험하다
// OpenSSL 1.1 이상을 제공하는 시스템에서만 사용 할수 있다.
// 주어진 자원에서 공격자가 사용할 수 있는 병렬 처리 양이 한정 되 있다.

// bcrypt
// 보안에 집착하기로 유명한 OpenBSD에서 사용하고
// .NET 및 자바를 포함한 많은 플랫폼 언어에서도 사용 할수 있다.
// 반복횟수를 늘려 연산속도를 늦출 수 있어서 연산능력이 증가해도
// 공격에 대비를 할 수 있다.
// 암호화된 string중에서 일부분을 salt로 쓰고 있어서.
// 그 데이터를 얻어온후에 pw와 같이 보내서 비교한다.

// pbkdf

// crypto.randomBytes(32, function (err, byte) {
//   crypto.pbkdf2(
//     pw, // 해싱하려고 한 문자열 (패스워드)
//     byte.toString("base64"), // 문자열로 변환하는데 인코딩 방식은 base64
//     // 반복 횟수를 지정. 반복 횟수가 많아질수록 복호화하기 어려워지는데 시간도 많이 걸린다.
//     165165,
//     64, // 길이를 설정
//     "sha512", // 암호화 알고리즘 설정
//     function (err, hashed) {
//       // 마지막이 콜백 함수
//       console.log(hashed);
//     }
//   );
// });

// salt값을 만들어주는 함수
const createSalt = () => {
  // 암호화를 처리하는데 시간이 걸리기 때문에
  // Promise를 사용해서 비동기 처리를 한다.
  return new Promise((resolve, reject) => {
    // 랜덤 바이트 생성 길이가 64
    crypto.randomBytes(64, (err, byte) => {
      if (err) reject(err);
      // 실패시 err 값 반환
      // 성공시 resolve 함수로 반환
      resolve(byte.toString("base64"));
    });
  });
};

// 비밀번호를 해싱 해주는 함수
const pwHashed = (userId, password) => {
  // Promise를 이용해서 비동기 처리
  return new Promise(async (resolve, reject) => {
    // 유저 테이블에서 user_id의 값이 있는지 확인
    const sql = "SELECT * FROM users WHERE user_id=?";
    // 쿼리문 실행 유저 아이디를 찾고
    client.query(sql, [userId], async (err, result) => {
      if (result[0]?.salt) {
        // 결과가 값이 있으면
        // 여기서 결과값은 해당 유저의 객체고 그 안에 salt 값을 가져온다.
        const salt = await result[0].salt;
        // pbkdf2 암호화를 하는데 해싱 알고리즘은 sha512이거
        // 길이 : 64, 반복 횟수 : 5165165
        crypto.pbkdf2(password, salt, 10000, 64, "sha512", (err, key) => {
          if (key.toString("base64") === result[0].password) {
            resolve(key.toString("base64"));
          } else {
            reject("err");
          }
        });
      } else {
        reject("err");
      }
    });
  });
};

const createPwHashed = (password) => {
  // 비동기 처리
  return new Promise(async (resolve, reject) => {
    const salt = await createSalt(); // 여기서 소금 만들고
    // 여기서 651665165 만큼 반복시키는데 키 스트레칭
    // 비밀번호에 문자를 더해서 암호화시키는 기법 salt 사용
    // 여기서 salt는 랜덤값이다 랜덤 바이트 함수로 만들어낸
    console.log(salt);
    crypto.pbkdf2(password, salt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        reject("err");
      } else {
        // 비밀번호 마다 고유의 salt 값을 가지고 있게 하기 위해서
        // 암호화한 비밀번호와 salt 값을 둘다 데이터 베이스에 저장할거임
        resolve({ password: key.toString("base64"), salt });
      }
    });
  });
};

// 간단 암호화된 로그인 만들어보자
// 모듈은 express, fs, mysql2

// express 열고, 데이터베이스 연결까지
// 데이터베이스 이름은 test8으로
// express에서 body객체 사용할거예요

const express = require("express");
const mysql = require("mysql2");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: false }));

const client = mysql.createConnection({
  user: "root",
  password: "admin1234",
  database: "test8",
  multipleStatements: true,
});

// const sql = `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id VARCHAR(255), password VARCHAR(255), salt VARCHAR(255))`;
// client.query(sql);

app.get("/", (req, res) => {
  fs.readFile("view/join.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/login", (req, res) => {
  fs.readFile("view/login.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/join", async (req, res) => {
  const { password, salt } = await createPwHashed(req.body.user_pw);
  const sql = "INSERT INTO users (user_id,password,salt)VALUES(?,?,?)";
  client.query(sql, [req.body.user_id, password, salt], (err, result) => {
    res.redirect("/login");
  });
});

app.post("/login", (req, res) => {
  const { user_id, user_pw } = req.body;
  pwHashed(user_id, user_pw)
    .then((result) => {
      res.send(result + "로그인 됬어요.");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3000, () => {
  console.log("서버 열림");
});
