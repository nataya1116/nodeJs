// 오늘 수업
// 경매소
// 로그인 회원가입 붙여서 구현
// 월요일에 쿠키 세션 JWT

// 사용할 모듈
// express, ejs, socket.io fs


// 1. express 서버 세팅
// 2. 라우터 분리


const express = require("express");

const ejs = require("ejs");

const socketIo = require("socket.io");

const fs = require("fs");

const PORT = 3000;

const app = express();

// 서버로 절대경로(이미지 등의 파일)도 사용하겠다는 설정
// 앞의 매개변수는 뒤의 경로를 이름으로 설정한 것 "/src"가 키 뒤의 경로가 값
// /img/image.jpg(실제 경로) -> /src/image.jpg(html 등에 표기하는 절대경로)
// app.use("/src",express.static(__dirname+"/img"));
// app.use(express.static(__dirname+"/img"));
app.use(express.static(__dirname));
app.use("/css",express.static(__dirname+"/css"));

// console.log(__dirname+"/img");
// console.log(express.static(__dirname+"/img"));

// 상품 번호 생성시 사용할 변수
let counter = 0;


class Product{
    constructor({name, image, price, count}){
        this.index = counter++;
        this.name = name;
        this.image = image;
        this.price = price;
        this.count = count;
    }
}



const products = [
    new Product({ 
        name : "사과", 
        image : "/", 
        price : 2000, 
        count : 20}),
    new Product({ 
        name : "초코", 
        image : "/", 
        price : 2000, 
        count : 20}),
    new Product({ 
        name : "오렌지", 
        image : "/", 
        price : 2000, 
        count : 20}),
    new Product({ 
        name : "배", 
        image : "/", 
        price : 2000, 
        count : 20}),
    new Product({ 
        name : "사시미", 
        image : "/", 
        price : 2000, 
        count : 20})
]

const cart = [];

console.log(products);


const server = app.listen(PORT, () => {console.log(PORT,"번 포트 열림.");});

app.get("/", (req, res) => {
    fs.readFile("page.html", "utf-8", (err, file) => {
        res.send(file);
    });
});

app.get("/shop", (req, res) => {
    // readFileSync shop.html을 utf-8로 인코딩해서 반환
    const page = fs.readFileSync("shop.html", "utf-8");
    res.send(
        ejs.render(page, { products })
    );
});


const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("connection");
    function onReturn(index) {
        
        products[index].count++;
        
        delete cart[index];

        const count = products[index].count;
        io.emit('count', {
            index,
            count
        }); 
    }
    
    socket.on("cart", (index) => {
        
        console.log("cart");
        // 물건의 갯수를 감소
        products[index].count--;
        
        cart[index] = { index };
        
        const count = products[index].count;
        io.emit('count', {
            index,
            count
        });

        console.log(products);
    });

    socket.on('buy', (index) => {
        console.log("buy");
        delete cart[index];
        const count = products[index].count;
        io.emit("count", {
            index,
            count
        });

        // console.log(products);
    });

    // 상품 구매 취소
    socket.on('return', (index) => {
        console.log("return");
        onReturn(index);

        // console.log(products);
    });
})