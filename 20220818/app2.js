// sequelize

// 폴더 경로까지만 작성해도 폴더 안의 파일을 찾는다.
const { sequelize, User } = require("./model");

// const { sync } = require("./model/users");

const { Op } = require("sequelize");

// force 속성은 디비에 첫 접속 시 값 초기화 여부
// 테이블 초기화할때 true 사용
sequelize.sync({force : false})
.then(() => {
    console.log("연결되었습니다.");
})
.catch((err) => {
    console.error(err);
})

// 생성 함수 INSERT INTO users (name, age, msg) VALUSE ("안녕3", 23, "호잇")
// User.create({
//     name : "안녕3", // name은 유니크 값이라 같은 값을 또 넣으면 오류가 난다.
//     age : 23,
//     msg : "호잇"
// });

// 조회 select * from users
// attributes : 원하는 컬럼만 가져온다.
// where : 검색 조건 설정 where : { age : 24 }
// order : 새엉 순서 정렬 DESC(내림차순), ASC(오름차순), order : [['age', "DESC"]]
// limit : 조회 할 갯수 limit : 1
// offset : 스킵할 갯수
// Op.gt (greater than, 초과),
// Op.gte (greater than or equal to, 이상),
// Op.lt (less than, 미만),
// Op.lte (less than or equal to, 이하),
// Op.ne (not equal, 같지 않음),
// Op.or (or, 또는),
// Op.in (in, 배열 요소 중 하나),
// Op.notIn (not in, 배열 요소와 모두 다름) 등이 있다.

async function select() {
    
    const user = await User.findAll({
        where : { age : { [Op.gte] : 24 }},
        [Op.or]: [{age : {[Op.gt] : 23}}, {name : "안녕2"}]
    });
    const temp = user.map((i) => i.dataValues);
    console.log(temp);
}

select();

// findOne은 사용방법은 동일하나 단 하나의 데이터만 가져온다.


// 수정 쿼리문 UPDATE users SET msg = '수정할 내용' WHERE (id = '1');
User.update(
    {
        msg : "수정할 내용",
    },
    {
        where : { id : 1 }
    }
)

// 삭제 쿼리문
User.destroy({
    where:{ id: 1 }
});

// 관계 쿼리문 join
