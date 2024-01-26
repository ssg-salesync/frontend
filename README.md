# frontend

## 📁 디렉터리 구조

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
- beforeUIUX: UI/UX 개선 전 이미지
- node_modules: 프로젝트에 포함된 라이브러리들이 설치
- public: 컴파일이 필요없는 정적 파일들(프로젝트에 사용한 이미지 파일들)
  - index.html: 가상 DOM을 위한 파일
- src:
  - api: 백엔드와 통신하는 api 파일들(GET, POST, PUT, DELETE)
    - auth: 사용자 인증과 관련된 api 파일들(info, login, signup)
    - :
    - BaseUrl.jsx: 자주 쓰이는 통신 URI를 환경변수로 선언
    - RefApi.md: 각 API 요청 형식 컨벤션을 정리
    - Token.jsx: 자주 쓰이는 token을 환경변수로 선언
  - components: 각 페이지에 사용되는 컴포넌트들
    - common: 모든 페이지에 공용으로 사용되는 컴포넌트들(header, footer, layout)이 위치
    - :
  - fonts: UI/UX용 폰트가 위치
  - pages: 각 페이지의 JSX가 위치
  - popup: 각 팝업의 JSX가 위치
  - recoil: 전역으로 상태를 관리하기 위헤 사용한 recoil이 위치
  - routes: 라우팅 컨벤션을 정의
  - styles: 모든 페이지에 공용으로 사용되는 UI/UX들이 위치
  - App.css: 화면 렌더링시에 보여지는 초기 css
  - App.jsx: 화면 렌더링시에 보여지는 초기 컴포넌트
  - index.css: 컴포넌트를 document에서 id값이 root인 태그 안에 렌더링되는 css
  - index.jsx:App 컴포넌트를 document에서 id값이 root인 태그 안에 렌더링
- .eslintrc.js: eslint(airbnb형) 컨벤션을 정의
- .prettierrc: 가독성 좋은 코드를 위한 컨벤션을 정의
- package(-lock).json: 프로젝트 이름, 버전 및 라이브러리 목록이 표기

## 🎨 디자인보드
<img src="https://github.com/ssg-salesync/.github/blob/main/assets/designBoard.png" alt = "designBoard gif" style="max-width: 45%;">

### 디자인 이야기

>&nbsp;&nbsp;POS는 거래 및 결제를 처리하는 비즈니스 도구로, 사용자들이 서비스를 사용하면서 안정적이고 신뢰감을 주기위해 블루 계열인 **#00ADEF**를 브랜드 색상으로 선택했습니다.
<br/>
&nbsp;&nbsp;전체적인 애플리케이션 무드도 편안하고 안정된 환경을 제공하기 위해 눈에 부담을 주지 않는 블루 계열로 설정했습니다.

### 로고 이야기

>&nbsp;&nbsp;Salesync는 커스터마이징 가능한 웹 기반 POS를 제공합니다. sales는 판매, Sync는 Synchronization의 줄임말로 데이터 및 정보를 효율적으로 동기화하고 연동함을 의미합니다. 따라서 주문과 매출데이터를 강조하는 브랜드명으로 Salesync로 정했습니다.
<br/>
&nbsp;&nbsp;두 단어의 첫 글자인 S를 강조하여 브랜드의 시각적인 식별성을 높여 쉽게 기억하도록 설정했습니다. 로고의 색상을 블루로 선택하여 전체적인 브랜드 컬러와의 일관성을 유지하고 안정성과 신뢰성을 전달했습니다.

## ⚒ 기술 스택

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/techstack/frontTechStack.png" alt = "frontTechStack" style="width: 600px;">

### 📃 기술 스택 Detail

|Tech|Explanation|
|:---:|:---|
| jsx | dd |
|React|-재사용 가능한 컴포넌트를 작성하여 개발 효율성을 높였습니다.<br> -React Router를 사용하여 업데이트 된 부분만 새로 렌더링했습니다.|
|Recoil|-코드 분할을 손상시키지 않고 앱 전역의 상태 관리하기 위해 Recoil을 선택했습니다.|
|Axios|-API 호출을 위해 내장함수인 FETCH 대신 Axios를 선정했습니다. <br>-서버와의 데이터 통신을 비동기적으로 처리했습니다.|
|styled components|-CSS를 별도의 파일로 두지 않고 하나의 모듈로 관리하기 위해 **CSS-in-JS** 방식을 채택했습니다. <br>-컴포넌트의 재사용을 위해 styled-components를 선정했습니다.|
|AWS S3|-정적 파일로 구성된 React를 쉽게 호스팅할 수 있는 플랫폼인 Amazon S3 Bucket을 사용했습니다. <br>-가용성이 용이하며, 사용자에게 빠른 성능을 제공합니다.|
|CloudFront|-Amazon S3와 CDN을 구성하여 성능을 최적화하고, ACM을 사용하여 SSL 인증서를 관리하기 위해 AWS CloudFront를 사용했습니다.|
|GitHub Actions|-손쉽게 워크플로우를 설정하고, 다양한 이벤트에 대한 트리거로 각 종 이슈의 원인을 탐색하기 위해 GitHub Actions로 파이프라인을 구성했습니다.|
| BFF | -응답 데이터를 클라이언트에서 요구되는 데이터로 파싱했습니다. <br>-데이터를 전송하는 과정에서 민감하거니 불필요한 데이터를 숨겼습니다. |
| react-calendar | -월별, 주별, 일별 등 다양한 표현 방식과 달력의 상태 관리를 용이하게 하기 위해 react-calendar를 선택했습니다. <br> -사용자에게 달력으로서 최적의 편리함을 제공합니다. |
| react-modal | -각 종 팝업을 위해 사용했으며, 이벤트 핸들링의 용이성과 중첩되어 열리는 것을 방지하는 모달 스택을 지원하는 react-modal을 사용했습니다. |
| recharts | -원형 그래프, 꺾은선 그래프 등 사용자가 직관적으로 이해하기 쉬운 대시보드 서비스를 위해 recharts를 사용했습니다. |

## ✏️ 네이밍 룰
- 컴포넌트, 페이지, 팝업,  API, 스타일: PascalCase
- Recoil: {기능}State.jsx
- Routing: Private(Public)Route.jsx
- CSS: styled-components(CSS-in-JS)
- 함수, 변수, 상수: camelCase
- 익명 함수: arrow function
- 이벤트 함수: on{이벤트}{기능}
- API: {기능}{요청방식}Api.jsx
- ESLint: .eslintrc.js에 airbnb 형식 적용
- 컴포넌트 작성할 때 ⇒ 함수형 컴포넌트 사용
- 이벤트핸들러는 handler로 시작하도록 작성
- 변수명 작성할 때 이름 길어지더라도 무슨 뜻인지 의미를 나타내도록 작성
    - handlerConfirm(x): 함수명만 보고 정확히 어떤 일을 하는지 알기 어려움
    - handlerConfirmPasswordBlur: 함수명만 보고도 이 함수의 역할을 알 수 있음

<!-- |<img src="https://github.com/ssg-salesync/.github/blob/main/assets/techstack/logo/react.png" alt = "react" style="width: 30px;"> <br> React|재사용 가능한 컴포넌트를 작성하여 개발 효율성을 높였습니다.<br> React Router를 사용하여 업데이트 된 부분만 새로 렌더링했습니다.|
|<img src="https://github.com/ssg-salesync/.github/blob/main/assets/techstack/logo/recoil.png" alt = "recoil" style="width: 30px;"> <br> Recoil|코드 분할을 손상시키지 않고 앱 전역의 상태 관리하기 위해 Recoil을 선택했습니다.|
|<img src="https://github.com/ssg-salesync/.github/blob/main/assets/techstack/logo/Axios.png" alt = "Axios" style="width: 30px;"> <br>Axios|API 호출을 위해 내장함수인 FETCH 대신 Axios를 선정했습니다. 서버와의 데이터 통신을 비동기적으로 처리했습니다.|
|<img src="https://github.com/ssg-salesync/.github/blob/main/assets/techstack/logo/styled components.png" alt = "styled components" style="width: 30px;"> <br> styled components|CSS를 별도의 파일로 두지 않고 하나의 모듈로 관리하기 위해 **CSS-in-JS** 방식을 채택했습니다. 컴포넌트의 재사용을 위해 styled-components를 선정했습니다.|
|<img src="https://github.com/ssg-salesync/.github/blob/main/assets/techstack/logo/aws s3.png" alt = "aws s3" style="width: 30px;"> <br> AWS S3|정적 파일로 구성된 React를 쉽게 호스팅할 수 있는 플랫폼인 Amazon S3 Bucket을 사용했습니다. 가용성이 용이하며, 사용자에게 빠른 성능을 제공합니다.|
|<img src="https://github.com/ssg-salesync/.github/blob/main/assets/techstack/logo/cloudfront.jpeg" alt = "cloudfront" style="width: 30px;"> CloudFront|Amazon S3와 CDN을 구성하여 성능을 최적화하고, ACM을 사용하여 SSL 인증서를 관리하기 위해 AWS CloudFront를 사용했습니다.|
|<img src="https://github.com/ssg-salesync/.github/blob/main/assets/techstack/logo/GitHubActions.png" alt = "GitHubActions" style="width: 30px;">GitHub Actions|손쉽게 워크플로우를 설정하고, 다양한 이벤트에 대한 트리거로 각 종 이슈의 원인을 탐색하기 위해 GitHub Actions로 파이프라인을 구성했습니다.| -->