// npm 설치
// formatting, Linting 설정
// node 프로젝트를 여러명이나 개인이 작업하다 보면 예상하지 못한 오류가 생겼을때 찾아내기가 힘들다. 런타임 코드를 이용자에게 전달하기 전에 문제를 잡아준다.
// formatting에서 좋은거 Prettier(Prettier - Code formatter)

// formatting을 해주는 Prettier 패키지 설치 명령어
// npm install --save-dev prettier

// --save-dev 우리가 프로젝트를 개발할때만 사용할 패키지

// npm 패키지를 설치하면 pakage.json에 내용이 추가된다. pakage.json의 중요한 역할 중에 하나는 메타 데이터를 표현하는 것도 있는대 현재 프로젝트가 사용하는 의존성 내용을 나열하는 것에도 목적이 있다.

// 노드 모듈 폴더는 git에 따로 올리지 않고 package.json만 올리고 npm i나 npm install로 설치 후 작업한다.

// pakage-lock.json에 기록되어 있는 내용은 실제로 설치된 패키지들이 어떤 것인지 알려준다. 팀에서 이 프로젝트를 같이 작업을 한다 하면 lock.json도 같이 업로드 해주는 것이 좋다. package.json에는 패키지의 버전 앞에 "prettier": "^2.7.1" ^기호가 있으면 버전이 정확하지 않아도 설치되게 만들어 준다.

// 서로 팀원낄 차이가 날 수 있다. 실제로 설치된 버전이 lock.json이므로 팀원들과 공유해야 한다. 버전이 맞지 않는 문제를 해결 할 수 있다.

// node_modules 파일도 생겼는대 npm 설치를 하니까 이 폴더 안에 설치되어 있는 .bin 폴더를 제외하고 다른 폴더들은 현재 프로젝트가 의존하고 있는 패키지들 .bin폴더는 컴퓨터가 이해 할 수 있는 텍스트 파일(바이너리)들이다.

// fortmatting 하는 방법
// 설치한 prettier를 사용해서 프로젝트 단위로 설정을 해준다. 번들 파일 하나 .prettierrc .vscode폴더를 만들고 안에  settings.json을 만들어 주자. 이곳에 설정한 잉유는 우리가 사용하는 vscode 설정 말고 프로젝트 단위로 설정을 적용 시킬 수 있다. 팀이나 회사에서 작업을 하면서 여러명이 작업할 때 설정 값을 미리 정해놓고 작업을 시작하면 병합시 충돌을 덜어준다.

// fortmatting이 적용되는 폴더가 vsc 내에서 최상단이어야 한다.(.vscode가 여러개일 수 있으므로 오류파티가 나지 않기 위한 나름의 규칙인듯)

// Linging 설치
// Lingting에서 좋은거 ESLint 패키지이자 플러그인
// ESLint 설치 명령여
// npm install --save-dev eslint-config-prettier

// lock.json에 의존성이 많이 생긴다. 클래스가 두 개 있다고 하면 클래스 간의 관계성을 뜻한다. 쓰려고 패키지 다운 받는 것과 같다.

// selint도 설정파일이 필요하다 이 설정 파일은 확장자가 필요하다. .eslintrc.js 파일 생성. vsc 마켓 플레이스에서 설치해야 할 것은 ESLnt 이다.

// rc 뜻은 별로 없다.

// runtime configuration

// run controll

// runcom

// resoure control

let a = 1;
