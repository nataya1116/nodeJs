const dot = require("dotenv").config();

const config = {
  dev: {
    // 사용자 이름
    user: "root",
    // 비밀번호
    password: process.env.DB_PASSWORD,
    // 연결할 데이터 베이스명
    database: "test9",
    // 다중 쿼리문 사용 속성
    multipleStatements: true,
  },
  dev2: {
    // 사용자 이름
    user: "root",
    // 비밀번호
    password: process.env.DB_PASSWORD,
    // 연결할 데이터 베이스명
    database: "test10",
    // 다중 쿼리문 사용 속성
    host : "127.0.0.1",
    dialect : "mysql"
  }
};

module.exports = config;
