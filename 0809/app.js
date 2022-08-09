// JWT
// JSON Web Token의 웹 표준으로 두 개체의 JSON 객체를 사용해서 정보를 안정성 있게 전달해준다. JWT는 사용할 정보를 자체적으로 가지고 있으며 발급된 토큰는 기본정보(유저의 정보, 프로필 등)를 가지고 있으며 정상적인 토큰인지 검증된 signature(서명)을 포함하고 있다. 

// 웹서버는 http의 헤더에 넣거나 url params 파라미터로도 전달할 수 있다. 주로 정상적인 로그인 상태인지 회원 권한 인증에서 사용한다.

// 로그인을 서버로 요청하면 서버에서는 유저의 정보를 가지고 정상적인 유저일 경우 토큰을 발급해서 헤더에 넣어 요청에 대한 응답을 해준다. 클라이언트는 요청할 때마다 발급받은 토큰을 같이 전송하며 서버는 토큰이 정상적일 때만 응답한다.

// 서버는 유저의 로그인 지속 여부나 세션을 유지할 필요가 없고 요청이 들어왔을 때 토큰이 정상적인지만 확인하면 되므로 서버 자원을 아낄 수 있다.

// JWT를 사용하는 이유는 요청마다 보안확인을 하기 때문에 안전성이 보다 높기 때문이다.

// JWT를 생성하면 Node.js의 JWT 라이브러리가 자동으로 HMAC SHA256 인코딩과 해싱 작업을 해준다.

// HMAC : 해싱 기법을 적용해서 메세지의 위변조를 방지하는 기법
// SHA256 : 4임의의 길이 메세지를 256비트의 축약된 메세지로 만들어내는 해시 알고리즘이다.

// 토큰의 정보

// header : 타입과 알고리즘의 정보를 가지고 있고
// payload : 유저의 정보들과 만료 기간이 포함된 객체를 가지고 있다.
// signature : header, payload를 인코딩하고 합쳐서 비밀키로 해쉬
// aaaaaaaa.bbbbbbbbb.ccccccccccc
// (header) (payload) (signature)

header = {
    alg : "HS256",
    type : "JWT"
}

payload = {
    // 토큰의 제목
    sub : "4151533",
    // 유저 이름
    name : "ssss",
    // 토큰 발급 경과 시간
    lat : "15412312412"
}

// signature = HMACSHA256(BASE64URL(header) + BASE64URL(payload));


const express = require("express");

const fs = require("fs");

const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");

require("dotenv").config();


const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))

app.listen(PORT, () => {console.log(PORT,"번 포트 대기 중");});

app.get("/", (req, res) => {
    fs.readFile("index.html", "utf-8", (err, file) => {
        res.send(file);
    })
});

app.post("/login", (req, res) => {
    // 로그인 하면 토큰 발급

    // .env 파일을 쓰는 이유 데이터 유출을 막기 위해
    // .env 애플리케이션이 작동할 때 처음부터 특정 값을 넘길 변수를 생성한다.
    const name = "asdgagsdgfads";
    const profile = "efasdgsgsd";
    const key = process.env.KEY;
    // jwt 토큰 생성
    const token = jwt.sign(
                    {
                        type : "JWT",
                        name
                    }, 
                    key, // 예시 키 키는 유출해서는 안된다.
                    {
                        expiresIn : "5m",
                        issuer : "나" // 토큰 만료시간 5분
                    }
                );

    const data = {
        msg : "토큰 내용",
        token,
    };

    // const decoded = jwt.decode(token);
    res.send(JSON.stringify(data));
    // res.send(decoded);
})



