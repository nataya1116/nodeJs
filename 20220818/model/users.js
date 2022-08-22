
const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize) {

        // super.init 함수의 첫번째 매개변수는 테이블 컬럼에 대한 설정, 두 번째는 테이블 자체의 설정
        return super.init(
            // 테이블 컬럼 설정
            {
                name : {                            // 네임 컬럼 생성
                    type : Sequelize.STRING(50),    // 시퀄라이즈 기본 문자열 타입
                    allowNull:false,                // null 허용
                    unique:true                     // 유니크 여부
                },
                age : {
                    type : Sequelize.INTEGER,
                    allowNull:false,
                },
                msg : {
                    type : Sequelize.TEXT,
                    allowNull:true
                }
            },
            // 테이블 설정
            {
                // sequelize : init 함수의 매개변수를 연결시켜주는 옵션
                sequelize,
                // timestamps : true이면 createdAt(생성 시간)과 updateAt(수정 시간) 컬럼을 추가해주고 생성 시간과 수정시간을 자동으로 입력해준다.
                timestamps:true,
                // underscored : sequelize는 테이블명과 컬럼명을 카멜표기법으로 표시해주는대 스네이크 표기법으로 바꿔주는 옵션이다.(caMel -> ca_mel)
                underscored:false,
                // modelName : 모델의 이름을 설정할 수 있다.
                modelName: "User",
                // tableName : 실제로 데이터 베이스에 등록되는 이름, 보통 모델의 소문자로 복수형으로 만들어준다.
                tableName: "users",
                // paranoid : true로 설정하면 deletedAt이라는 컬럼도 추가된다. 삭제하면 데이터가 지워지는 것이 아니라 delededAt에 삭제한 시간이 표기된다.(검색했을 때 제외하지 않아도 찾지 않음) 삭제했을 때 값을 남겨둬야 하거나 복원시켜야 하는 값을 때 이 설정값을 사용한다.
                paranoid:false,
                // charset:"utf-8", collate:"utf8_general_ci"으로 설정해줘야 한글 입력이 가능하다. 이모티콘도 사용하려면 utf8md4, utf8md4_general_ci 를 입력해주면 된다.
                charset:"utf8",
                collate:"utf8_general_ci",
            }
        );
    }

    // associations 함수에서 다른 모델과의 관계를 적어준다.
    // mysql JOIN이라는 기능으로 여러 테이블 간의 관계를 만들어준다.
    // 시퀄라이즈는 테이블의 관계성만 입력하면 JOIN 기능도 알아서 구현한다.
    static associations(db){}
}

module.exports = User;