module.exports = {
  extends: ["airbnb-base", "plugin:node/recommended", "prettier"],
};

// 설정 해보기 미리 좋은 세팅들이 있으니까 사용하면 좋다.

// 유명한 air bnb 설정 사용

// https://github.com/airbnb/javascript

// air bnb 패키지 설치 명령어

// npm install --save-dev eslint-config-airbnb-base
// npm install --save-dev eslint-plugin-import

// npm 패키지 두개를 다운받아야하면

// npm install --save-dev eslint-config-airbnb-base eslint-plugin-import
// --save-dev는 개발환경
// --save-dev로 받은 패키지는 devDependencies에 작성된다.
// 개발에만 필요하고 실제 구동은 필요 없는 것들

// esint prettier package 다운 명령어
// npm install --save-dev eslint-config-prettier

// prettier 와 충돌이 나기 때문에 오류가 나지만 extends: ["airbnb-base"] 에 prettier의 규칙도 같이 적용해주면 된다. 지금까지 작업한 것 보다 많이 깐깐하다.

// node에 대한 설정 전용 플러그인
// node  전용 플러그인 설치 명령어
// npm install --save-dev eslint-plugin-node
