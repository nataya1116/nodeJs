// 입장 토큰만 사용해서 로그인 검증

// Acess Token만 쓴 방식

// 1. 이용자 로그인 시도
// 2. 서버에서 이용자를 확인하고 JWT 토큰 을 payload에 할당하고 생성
// 3. 생성한 토큰을 클라이언트에 반환해주고 클라이언트가 이 토큰을 가지고 있음
// 4. 클라이언트에서 권한을 인증 요청할 때 이 토큰을 같이 보낸다.
// 5. 서버는 토큰을 화인하고 payload의 값 인코딩되어 있는 값을 디코딩해서 사용자의 권한을 확인하고 데이터를 반환
// 6. 토큰이 정상인지 확인
// 7. 기간이 만료되면 다시 로그인해서 토큰 재발급

// refresh token 과 같이 사용하면
// aceess token 인증보안에 취약하고 다른사람이 토큰을 취득하면 유효기간이 있을때까지는 사용가능하다 유효기간을 짧게 할 경우 로그인을 자주해야 하는 문제가 생기는대 이 문제점을 refresh token으로 해결 할 수 있다. refress token과 acess token은 둘다 jwt 토큰이다.

// refresh token은 유효기간을 길게 주고 acess token 유효기간이 끝났을때 발급해주는 역할만 한다.

// Acess token을 30분만 주면 리프레쉬 토크느이 유효기간을 하루 주고 액세스 토큰의 유효기간이 끝나면 리프레쉬 토큰의 유효기간을 확인하고 액세스 토큰을 재발급해준다.

// 액세스 토큰과 리프레쉬 둘 다 이용한 인증 방식
// 1. 이용자 로그인
// 2. 서버에서 사용자를 확인하고 입장권 권한 인증 정보를  payload에 할당해서 생성하고 리프레쉬 토큰도 생성해서 서버에 저장한다. 두 토큰 모두 클라이언트에게 반환한다.
// 3. 클라이언트도 두 토큰을 저장한다.
// 4. 클라이언트가 권한 인증이 필요해서 요청하면 액세스 토큰을 전달하면서 요청한다.
// 5. 서버는 전달받은 토큰을 확인하고 페이로드의 인코딩된 값을 디코딩해서 사용자의 권한을 확인한다.
// 6. 토큰이 정상적인지 확인한다
// 7. 날짜가 만료되었다면 새로 로그아웃시켜서 로그인으로 토큰을 재발급 하게 한다. 만료된 액세스 토큰과 리프레쉬 토큰을 헤더에 실어서 서버로 전송한다.
// 8. 서버는 액세스 토큰과 리프레쉬 토큰을 확인하고 리프레쉬 토큰이 만료 되지 않았으면 새로운 액세스 토큰을 발급해서 클라이언트에 전달한다.

// dotenv express cookie-parser jsonwebtoken fs

const express = require("express");

const cookie = require("cookie-parser");

const jwt = require("jsonwebtoken");

const fs = require("fs");

require("dotenv").config();

const PORT = 4000;

const app = express();

// body-parser 대체 post 값 사용
app.use(express.urlencoded({extended:false}));

// 쿠키 사용
app.use(cookie());

app.use(express.static("public"));

const user = {
    id : "jin",
    pw : "123"
};


app.listen(PORT, () => {
    console.log(PORT,"번 포트 대기 중...");
});

app.get("/", (req,res) => {
    fs.readFile("view/login.html", "utf-8", (err, page) => {
        if(err) console.error(err);
        res.send(page);
    });
})

app.post("/login", (req,res) => {
    const id = req.body.user_id;
    const pw = req.body.user_pw;
    if(id == user.id && pw == user.pw){
        // type 디폴트는 JWT으로 생략 가능하다
        const accessToken = jwt.sign(
            {id},
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: "5m",
            }
        ); 
        const refreshToken = jwt.sign(
            {id},
            process.env.REFRESH_TOKEN_KEY,
            {
                expiresIn: "1d" // 1일
            }
        );
        const oneDayMs = 24 * 60 * 60 * 1000;
        res.cookie("refresh", refreshToken, {maxAge : oneDayMs});
        return res.send(accessToken);
    }else{
        return res.send("아이디 비밀번호 오류");
    }
});

app.post("refresh", (req,res)=>{
    // ? 연산자는 값이 있으면 먼저 확인하고 값을 반환한다.
    // ? 연산자가 없고 refresh가 없으면 오류가 생겨 서버가 멈추게 된다.
    if(req.cookies?.refresh){
        const refreshToken = req.cookies.refresh;
    } else {

    }
})