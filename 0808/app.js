// 쿠키 & 세션
// 데이터나 인증(권한)을 유지하기 위해서

// 차이점
// 쿠키는 클라이언트 pc에 남아있고 세션을 웹 페이지를 종료하면 삭제된다.

// 쿠키
// 웹 사이트를 방문할 때 사용자의 컴퓨터에 기록할 데이터
// 클라이언트 상태 정보를  pc에 저장했다가 재사용 가능

// 쿠키 사용처
// 웹페이지에서 팝업 오늘은 보지 않기 체크 박스 몇일 정도 쿠키를 저장할 지
// 자동로그인 비밀번호 아이디 자동으로 입력

// 쿠키의 특징
// 이름, 값, 유효기간, 경로 정보로 구성되어 있음
// 클라이언트 pc 당 총 300개 까지 저장 가능
// 하나의 도메인 당 최대 20개까지 저장 가능
// 쿠키의 최대 용량은 4kb

// url 경로 별로 쿠키 별도 관리 가능

// 키 값으로 구성되어 있고 유효기간은 date객체로 가지고 있음

// 쿠키는 js의 document의 기본 기능이다.

// 쿠키 생성 함수(이름, 값, 유효기간)
const createCookie = (key, value, day) => {// 쿠키 생성 함수(이름, 값, 유효기간)
    const date = new Date();
    const timeMs = day * 24 * 60 * 60 * 1000;
    // getTime() 리턴값은 ms단위
    date.setTime(date.getTime + timeMs);

    // 쿠키는 키 값의 구조로 객체처럼 값을 가져올 수 있음
    // 쿠키의 경로
    // 도메인 하위로 하위 쿠키 경로를 지정 할 수 있다.
    // 쿠키 갯수가 적으면 루트 url만 사용

    // 만료일(expires)
    // 만료일은 GMT 시각 문자열 쿠키는 삭제하는 기능이 없으며 만료일을 과거로 설정해 삭제할 수 있다. 삭제 보안 문제나 개인 정보 노출이 이슈이므로 시간은 가능하면 짧게 1~3개월 정도를 추천하며 1년은 절대로 넘어서는 안된다.(민감한 데이터가 유출될 수 있다.)
    // document.cookie에 바로 저장 할 수 있다.
    // toUTCString() 함수를 사용해서  SAT, 02 Oct 2021 15:50:50 GMT 형대로 변경
    document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
}

const getCookie = (key) => {
    // 현재 저장된 쿠키 중 key에 맞는 쿠키가 저장되어 있으면 리턴
    const value = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);

    // if(!!value) value.forEach((value) => {
    //     console.log(`cookie ${value}`);
    // });
    return value ? value[2] : null;
}

const isCookie = (key) => {
    return !!getCookie(key);
}

const deleteCookie = (key) => {
    console.log("delete",key);
    console.log(key + "=; expires = Thu, 01 Jan 1999 00:00:10 GMT;");
    document.cookie = key + "=; expires = Thu, 01 Jan 1999 00:00:10 GMT;";
}


// 세션
// 클라이언트의 요구를 하나의 상태로 보고 유지시키는 기술로 브라우저를 종료하기 전 까지 유지된다. 클라이언트가 웹 서버에 접속해 있는 상태를 세션
// 웹 사이트에서 로그인했을때 구매나 장바구니
// 로그인 사용자의 프로필 정보
sessionStorage.setItem("myItem", "저장데이터");
sessionStorage.getItem("myItem");

// 세션에 데이터가 몇개 들어있는지 확인하는 방법
sessionStorage.length;

// 세션의 키 값을 인덱스로 가져오기
sessionStorage.key(0);

// 세션의 데이터 전체 삭제
sessionStorage.clear();
