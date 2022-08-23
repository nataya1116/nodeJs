// index.js 모델의 모든 모듈을 모아서 가지고 있다.

const Sequelize = require("sequelize");
const config = require('../config/config');
const User = require("./users");
const Post = require("./posts");

console.log(config);

// 시퀄라이즈 객체 생성
const sequelize = new Sequelize(
                        config.dev.database,
                        config.dev.username,
                        config.dev.password,
                        config.dev
                        );

// 내보내기를 수월하게 하기 위해서 빈 객체로 만든다.
const db = {};
db.sequelize = sequelize;
db.User = User;
db.Post = Post;

// 이 구문이 없으면 테이블이 생성되지 않음
User.init(sequelize);
Post.init(sequelize);

// 관계 맺어주는 함수 사용(fk 생성해줌)
User.associate(db);
Post.associate(db);

module.exports = db;