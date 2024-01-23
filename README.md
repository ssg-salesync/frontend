# frontend

## 테스트 제목


📁 frontend

 ├──── 📁 .github <br>├──── 📁 ISSUE_TEMPLATE<br>
 │      │      ├──── 📄 ✅-feature-request.md<br>
 │      │      └──── 📄 🐞-bug-report.md<br>
 │      ├──── 📁 workflows
 │      │      ├──── 📄 deploy.yml
 │      │      └──── 📄 desc.txt
 │      ├──── 📄 CODEOWNERS
 │      └──── 📄 PULL_REQUEST_TEMPLATE
 ├──── 📁 assets
 ├──── 📁 public 
 ├──── 📁 src
 │      ├──── 📁 api
 │      ├──── 📁 components
 │      ├──── 📁 pages
 │      ├──── 📁 popup
 │      ├──── 📁 styles
 │      ├──── 📁 ui
 │      ├──── 📄 App.js
 │      └──── 📄 index.js
 │──── 📄 .eslintrc.js
 │──── 📄 .gitignore
 │──── 📄 .prettierrc
 │──── 📄 package-lock.json
 └──── 📄 package.json

 - api: 서버와 통신하거나 데이터를 가져오는 API 요청을 수행하는 코드 디렉터리
 - assets: 이미지 등 정적 파일 디렉터리
 - components: Nav, Header 등 사용하는 컴포넌트 디렉터리
    - common: Header 등 공통 컴포넌트
    - {화면이름}: 화면에 사용되는 컴포넌트
 - pages: 서비스 페이지 디렉터리
 - popup: 팝업 디렉터리
 - styles: css 디렉터리
 - ui: 재사용 가능한 ui 디렉터리

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
