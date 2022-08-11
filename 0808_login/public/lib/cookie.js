// 로그인창 만들기
// 1. 로그인창 접속하면 광고팝업
// 2. 체크박스에 체크하면 하루동안 안보이게
// 3. 로그인하면 유저 이름이 nav바 위에 어서오세요 누구누구님

const createCookie = ({key, val, day}) => {
    const date = new Date();
    const ms = day * 24 * 60 * 60 * 1000;
    date.setTime(date.getTime() + ms)
    document.cookie = `${key}=${val};expires=${date.toUTCString()};path=/`;
    console.log(document.cookie);
}

const getCookie = (key) => {
    const rtn = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
    return rtn ? rtn[2] : null;
}

const isCookie = (key) => {
    return !!getCookie(key);
}

const deleteCookie = (key) => {
    document.cookie = key + "=; expires = Thu, 01 Jan 1999 00:00:10 GMT;";
}