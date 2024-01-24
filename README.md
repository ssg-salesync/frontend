# frontend

## 프로젝트 디렉터리 구조

```
📁 frontend
 ├──── 📁 .github
 │      ├──── 📁 ISSUE_TEMPLATE
 │      │      ├──── 📄 ✅-feature-request.md
 │      │      └──── 📄 🐞-bug-report.md
 │      ├──── 📁 workflows
 │      │      ├──── 📄 deploy.yml
 │      │      └──── 📄 desc.txt
 │      ├──── 📄 CODEOWNERS
 │      └──── 📄 PULL_REQUEST_TEMPLATE
 ├──── 📁 beforeUIUX 
 ├──── 📁 node_modules
 ├──── 📁 public
 │      ├──── 📁 img
 │      └──── 📄 index.html
 ├──── 📁 src
 │      ├──── 📁 api
 │      │      ├──── 📁 auth
 │      │      │      ├──── 📁 info
 │      │      │      ├──── 📁 login
 │      │      │      └──── 📁 signup
 │      │      ├──── 📁 dashboard
 │      │      │      ├──── 📁 chart
 │      │      │      ├──── 📁 consulting
 │      │      │      │      └──── 📁 test
 │      │      │      └──── 📁 costs
 │      │      ├──── 📁 items
 │      │      ├──── 📁 orders
 │      │      ├──── 📁 pay
 │      │      ├──── 📁 pos
 │      │      │      ├──── 📁 category
 │      │      │      └──── 📁 item
 │      │      ├──── 📁 sale
 │      │      ├──── 📄 BaseUrl.js
 │      │      ├──── 📄 RefAPi.md
 │      │      └──── 📄 Token.jsx
 │      ├──── 📁 components
 │      │      ├──── 📁 common
 │      │      ├──── 📁 dashboard
 │      │      ├──── 📁 func
 │      │      ├──── 📁 order
 │      │      ├──── 📁 payment
 │      │      └──── 📁 pos
 │      ├──── 📁 fonts
 │      ├──── 📁 pages
 │      ├──── 📁 popup
 │      ├──── 📁 recoil
 │      │      └──── 📁 atoms
 │      ├──── 📁 routes
 │      ├──── 📁 styles
 │      ├──── 📄 App.css
 │      ├──── 📄 App.jsx
 │      ├──── 📄 index.css
 │      └──── 📄 index.jsx
 │──── 📄 .eslintrc.js
 │──── 📄 .gitignore
 │──── 📄 .prettierrc
 │──── 📄 package-lock.json
 └──── 📄 package.json
```

 - .github: CI/CD 파이프라인, GitHub 워크플로우 및 협업 컨벤션 
 디렉터리
 - beforeUIUX: UI/UX 개선 전 이미지 디렉터리
 - node_modules: 프로젝트에 포함된 라이브러리들이 설치되어 있는 디렉터리
 - public: 컴파일이 필요없는 정적 파일들(프로젝트에 사용한 이미지 파일들)이 위치한 디렉터리
    - index.html: 가상 DOM을 위한 파일
 - src:
    - api: 백엔드와 통신하는 api 파일들(GET, POST, PUT, DELETE)이 위치한 디렉터리
       - auth: 사용자 인증과 관련된 api 파일들(info, login, signup)이 위치한 디렉터리
       :
       :
       - BaseUrl.jsx: 자주 쓰이는 통신 URI를 환경변수로 선언한 파일 
       - RefApi.md: 각 API 요청 형식 컨벤션을 정리한 파일
       - Token.jsx: 자주 쓰이는 token을 환경변수로 선언한 파일
    - components: 각 페이지에 사용되는 컴포넌트들이 위치한 디렉터리
       - common: 모든 페이지에 공용으로 사용되는 컴포넌트들(header, footer, layout)이 위치한 디렉터리
       :
       :
    - fonts: UI/UX용 폰트가 위치한 디렉터리
    - pages: 각 페이지의 JSX가 위치한 디렉터리
    - popup: 각 팝업의 JSX가 위치한 디렉터리
    - recoil: 전역으로 상태를 관리하기 위헤 사용한 recoil이 위치한 디렉터리
    - routes: 라우팅 컨벤션을 정의한 디렉터리
    - styles: 모든 페이지에 공용으로 사용되는 UI/UX들이 위치한 디렉터리
    - App.css:
    - App.jsx: 화면 렌더링시에 보여지는 초기 컴포넌트
    - index.css: 
    - index.jsx: 
 - .eslintrc.js: eslint(airbnb형) 컨벤션을 정의한 파일
 - .prettierrc: 가독성 좋은 코드를 위한 컨벤션을 정의한 파일
 - package(-lock).json: 프로젝트 이름, 버전 및 라이브러리 목록이 표기된 파일

 ## 디자인 이야기
 POS는 거래 및 결제를 처리하는 비즈니스 도구로, 사용자들이 서비스를 사용하면서 안정적이고 신뢰감을 주기위해 블루 계열인 **#00ADEF**를 브랜드 색상으로 선택하였습니다. 전체적인 어플리케이션 무드도 편안하고 안정된 환경을 제공하기 위해 눈에 부담을 주지 않는 블루 계열로 설정하였습니다.

 ## 로고 이야기
 Salesync는 커스터마이징 가능한 웹 기반 POS를 제공합니다. 
 sales는 판매 , Sync는 Synchronization 줄임말로 데이터 및 정보를 효율적으로 동기화하고 연동함을 의미합니다. 따라서 주문과 매출데이터를 강조하는 브랜드명으로 Salesync로 정했습니다. 두 단어의 첫 글자인 S를 강조하여 브랜드의 시각적인 식별성을 높여 쉽게 기억하도록 하였습니다. 로고의 색상을 블루로 선택하여 전체적인 브랜드 컬러와의 일관성을 유지하고 안정성과 신뢰성을 전달하였습니다.

 ## 기술 스택
```
javascript ,React, Recoil, Axios, Styled components, AWS S3, CloudFront, Github Action,bff
라이브러리 : recharts , react-calender, react-modal
```
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<br>재사용 가능한 컴포넌트를 작성하여 개발 효율성을 높였습니다.
React Router를 사용하여 업데이트 된 부분만 새로 렌더링하였습니다.
<br><br>
<img src="https://img.shields.io/badge/Recoil-0075EB?style=flat-square&logo=Recoil&logoColor=white"/>
<br>코드 분할을 손상시키지 않고 앱 전역의 상태 관리하기 위해 Recoil을 선택했습니다.
<br>
<br>
<img src="https://img.shields.io/badge/axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
<br>
API 호출을 위해 내장함수인 FETCH 대신 Axios를 선정했습니다.<br>
서버와의 데이터 통신을 비동기적으로 처리하였습니다.<br>
<br>
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/><br>
CSS를 별도의 파일로 두지 않고 하나의 모듈로 관리하기 위해 **CSS-in-JS** 방식을 채택했습니다.
<br>
컴포넌트의 재사용을 위해 Styled-components를 선정했습니다.

bff 
<br>
응답 데이터를 클라이언트에서 요구되는 데이터로 파싱했습니다.
데이터를 전송하는 과정에서 민감하거니 불필요한 데이터를 숨겼습니다.
