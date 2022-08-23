// 암호화

// 단방향 양방향 암호 방식 
// 단방향 : 복호화해서 원래의 값을 알 수 없음. 양방향보다 더 안전하다
// 양방향 : 복호화해서 원래의 값을 알 수 있다.

// 네이버 같은 사이트에서도 단반향 암호화를 해서 비밀번호 찾았을 때 값을 알려주기 보다는 비밀번호를 바꿀 수 있도록 한다.
// 복호화는 암호문을 편문으로 변환하는 과정이며 부호화된 데이터를 부호화 되기 전 형태로 변경해 사람이 읽을 수 있는 형태로 변환한다.

// 단반향의 비교 검증 방법
// 데이터베이스에 저장된 암호화된 비밀번호와 로그인할 때 입력받은 비밀번호를 암호화해 값을 비교한다.

// 단방향 암호화는 해쉬 알고리즘을 사용해서 문자열을 고정된 길이의 문자열로 암호화 시킨다.

// 15413531 / 321423152513 둘의 길이는 다르지만 해쉬 알고리즘으로 길이를 정해놓으면 정해진 길이의 암호가 만들어 진다.

// crypto 모듈 가져오기
const crypto = require("crypto");

const pw = "44566545";

// 단순 해싱으로 비밀번호 해싱

// 사용할 해시 알고리즘은 sha512
const hashAlgor = crypto.createHash('sha512');

// 사용할 해시 알고리즘은 sha512이며 그 외에도 md5, sha1, sha256, sha512 등이 있다. sha512 알고리즘은 국가안보국(NSA)이 설계한 암호 해쉬 함수이다. sha512는 512비트(64바이트) 해시 값을 만들어주는대 일반적으로 길이가 128자리인 16진수로 렌더링 된다.

//                              암호화 시킬 문자열
const hashing = hashAlgor.update(pw);

// digest()함수를 사용해서 해싱된 객체를  base64 형식으로 인코딩해 문자열로 반환해준다.
//                              인코딩할 알고리즘을 넣어줌
const hasString = hashing.digest("base64");

// console.log(hasString);

// 알고리즘으로 암호화하는 이유는 해킹을 어렵게 하기 위해서이다. 지금과 같은 방식의 경우 같은 값이 들어가면 암호화된 문자열도 계속 동일하기 때문에 암호화의 효과가 떨어진다는 단점이 있다.

// 이를 보완한 것이 salt라는 기법이다. 복호화의 난이도를 높여준다. 비밀번호에 문자열을 추가로 덧붙여서 같은 비밀번호라도 암호화를 시키면 같은 해쉬 출력값을 가지고 있지 않도록 처리해준다.

// salt 값은 항상 비밀번호에 매번 추가 시켜서 사용해야 하니까 salt 값을 잘 보관하여야 한다.(.env 등에 저장)

// crypto의 랜덤 바이트 생성 함수 랜덤한 바이트를 생성 시킬 수 있다. 32바이트 이상이어야 값을 뚫기 어려워진다.
//                 byte-size, 콜백 함수
crypto.randomBytes(32       , (err, byte) => {
    // 32bit 길이의 랜덤한 byte 생성
    if(err) {
        console.error(err);
    }else {
        console.log(byte);
    }
});

// 크립트의 randomBytes 함수로 salt 값을 만들어서 db에 저장하고 모든 패스워드가 고유의 salt 값을 가지게 할 수도 있다.

// salt 기법 외에도 키 스트레칭 기법이 있다. 키 스트레칭은 salt와 패스워드를 해시 함수에 넣는 과정을 반복시켜서 해켜가 복호화를 어렵게 한다. 계산량을 늘려서 값 출력을 임의적으로 느리게 만드는 방법이다.

// 키 스트레칭 방법으로 암호화하는 모듈은 pbkdf, scrypto, bcrypto 세 가지가 있는데 bcrypto 기능이 좋아 많이 사용한다.

// pbkdf
// 해시함수의 컨테이너 역할을 하고 해시함수에 salt를 적용해서 해시함수의 반복횟수를 지정해 암호화 할 수 있다, IOS 표준애 적합하며 NIST에서 승인된 알고리즘이다.

// scrypto
// 기능은 매우 강력하지만 많은 자원을 사용한다. 오프라인 공격에는 강하지만 해킹(요청으로 서버에 직접적인 공격)을 당했을때 오히려 과부하가 나기 쉽다는 큰 단점이 있다. OpenSSL 1.1 이상을 제공하는 시스템에서만 사용 할 수 있다.
// 주어진 자원에서 공격자가 사용할 수 있는 병렬 처리 양이 한정되어 있다.

// bcrypto
// 보안에 집착하기로 유명한 OpenBSD에서 사용하며 .NET 및 자바를 포함한 많은 플랫폼 언어에서도 사용 할 수 있다. 반복횟수를 늘려 연산속도를 늦출 수 있어서 연산능력이 증가해도 공격에 대비를 할 수 있다. 암호화된 String 중에서 일부분을 salt로 쓰고 있어서 그 데이터를 얻어온 후에 pw와 같이 보내서 비교한다.