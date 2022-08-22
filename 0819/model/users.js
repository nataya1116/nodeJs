const Sequelize = require("sequelize");

// User 클래스에서 시퀄라이즈 안의 모듈 객체의 기능을 상속
class User extends Sequelize.Model {
    
    // static init 메서드에서 테이블을 생성 및 연결(매핑)
    static init(sequelize){
        // 상속받은 함수를 쓰려면 super를 사용한다.
        // init함수의 첫번째 매개변수가 테이블의 구성(컬럼 명, 타입, 속성 등)
        // 테이블 자료형 https://pjt3591oo.github.io/sequelizejs_translate/build/html/CoreConcepts/DateTypes.html

        // 두번째 매개변수 테이블 설정 값 
        return super.init(
            {
                // 기본키를 안만들면 자동으로 db에서 id pk를 만들어준다.

                name : {
                    type : Sequelize.STRING(20),
                    // null 허용 false 필수, true 없어도 무방
                    allowNull : false,
                    // 주민번호, 전화번호 등
                    unique : true 
                },
                age : {
                    type : Sequelize.INTEGER,
                    allowNull : false
                },
                msg : {
                    // 문자로 받을거니까 TEXT
                    type : Sequelize.TEXT,
                    allowNull : true
                },
                create_at : {
                    // 시퀄라이즈 시간 타입이 아니면 값이 저장되지 않는다.
                    type : Sequelize.DATE,
                    allowNull : false,
                    // 기본 값 설정 NOW 현재 시간(값을 넣지 않아도 기본으로 저장된다.)
                    // timestamps : true로 설정하면 디폴트 벨류를 저장하지 않아도 된다.
                    defaultValue : Sequelize.NOW
                },
            },
            {
                sequelize,
                // 생성하면 create_at 컬럼이 생기고 업데이트 하면 update_at 컬럼이 생겨서 업데이트된 시간도 저장된다.
                timestamps : true,
                underscored : false, // 카멜표기법
                modelName : "User", // 관계형으로 구성될때 사용
                tableName : "users",
                paranoid : false,
                // ㄱ ㅏ ㄴ ㅏ 인코딩 방식 문제로 아래 속성 값이 제대로 들어가있는지 확인
                charset : "utf8",
                collate : "utf8_general_ci"
            }
        );            
    }

    // (Foreign Key) 설정
    static associate(db){
        // 1 : N (hasMany, belongsTo)
        // 시퀄라이즈에서 1 : N 관계를 hasMany 함수로 정의를 한다.
        // hasMany 함수를 이용해서 테이블의 관계를 정의해준다.
        // 첫번째 매개변수로 연결할 테이블, 두번째 매개변수로 포링키(Post 테이블 기준), 소스키(User 테이블 기준)
        db.User.hasMany(db.Post, {foreignKey : "user_id", sourceKey: "id"});
    }
}

module.exports = User;