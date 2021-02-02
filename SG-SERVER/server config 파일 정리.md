## server config 파일 정리

----

### nodemon.json

* watch : 이 파일들의 코드 변경이 감지되면 서버를 재시작하겠다
* ext : extension, 파일 확장자
* ignore : 제외할 파일
* exec : 감지되었을 때 수행할 명령

### package.json 기본 서버 세팅 devdepondencies, dependencies

* cross-env : 운영체제나 플랫폼에 종속되지 않고동일한 방법으로 env 변수를 주입하는 방법
* nodemon : 파일이 수정이 됐을 때 자동으로 감지하여 서버를 재시작해주는 모듈
* ts-node : 메모리 상에서 타입스크립트를 트랜스파일 하여 바로 실행할 수 있게 해주는 모듈
* tsconfig-paths : tsconfig.json내에 paths 옵션에 명시된 모듈을 호출하게 도와주는 라이브러리
* typescript : 타입스크립트를 사용할 수 있게 해주는 모듈

### 추가적인 세팅 devdepondencies, dependencies

* dotenv : .env파일을 이용하여 database의 정보를 설정하여 저장 할 수 있도록 해주는 모듈
* 

