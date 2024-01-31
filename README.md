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
 │      │      ├──── 📄 BaseUrl.jsx
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
  - index.css: App 컴포넌트를 document에서 id값이 root인 태그 안에 렌더링되는 css
  - index.jsx: App 컴포넌트를 document에서 id값이 root인 태그 안에 렌더링
- .eslintrc.js: eslint(airbnb형) 컨벤션을 정의
- .prettierrc: 가독성 좋은 코드를 위한 컨벤션을 정의
- package(-lock).json: 프로젝트 이름, 버전 및 라이브러리 목록이 표기

## 🎨 디자인보드
<img src="https://github.com/ssg-salesync/.github/blob/main/assets/designBoard.png" alt = "designBoard gif" style="max-width: 45%;">

### 디자인 이야기

>&nbsp;&nbsp;POS는 거래 및 결제를 처리하는 비즈니스 도구로, 사용자들이 서비스를 사용하면서 안정적이고 신뢰감을 주기위해 블루 계열인 **#00ADEF**를 브랜드 색상으로 선택했습니다.<br/>
&nbsp;&nbsp;전체적인 애플리케이션 무드도 편안하고 안정된 환경을 제공하기 위해 눈에 부담을 주지 않는 블루 계열로 설정했습니다.

### 로고 이야기

>&nbsp;&nbsp;Salesync는 커스터마이징 가능한 웹 기반 POS를 제공합니다. sales는 판매, Sync는 Synchronization의 줄임말로 데이터 및 정보를 효율적으로 동기화하고 연동함을 의미합니다. 따라서 주문과 매출데이터를 강조하는 브랜드명으로 Salesync로 정했습니다.<br/>
&nbsp;&nbsp;두 단어의 첫 글자인 S를 강조하여 브랜드의 시각적인 식별성을 높여 쉽게 기억하도록 설정했습니다. 로고의 색상을 블루로 선택하여 전체적인 브랜드 컬러와의 일관성을 유지하고 안정성과 신뢰성을 전달했습니다.

## 🔍 Overview

| 웰컴 페이지 | 회원가입 |
| :--: | :--: |
| <img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/welcome.gif" alt = "welcome gif" style="width: 450px;"> | <img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/signup.gif" alt = "signup gif" style="width: 450px;"> |
| **로그인** | **POS 커스터마이징 - 카테고리 등록** |
| <img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/login.gif" alt = "login gif" style="width: 450px;"> | <img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/categoryAdd.gif" alt = "categoryAd gif" style="width: 450px;"> |
| **POS 커스터마이징 - 아이템 등록** | **POS 메인 - 주문 내역 조회** |
| <img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/itemAdd.gif" alt = "itemAdd gif" style="width: 450px;"> | <img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/orderList.gif" alt = "orederList gif" style="width: 450px;"> |
| **POS 메인 - 주문 신규 등록** | **POS 결제 - 현금** |
| <img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/orderAdd.gif" alt = "orderAdd gif" style="width: 450px;"> | <img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/payCash.gif" alt = "payCash gif" style="width: 450px;"> |
| **POS 결제 - 카드** | **대시보드** |
| <img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/payCard.gif" alt = "payCard gif" style="width: 450px;"> |<img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/dashboardSales.gif" alt = "dashboardSales gif" style="width: 450px;">|
| **AI 컨설팅** ||
|<img src="https://github.com/ssg-salesync/.github/blob/main/assets/page/consulting.gif" alt = "consulting gif" style="width: 450px;">||
<p align="center">
    <b>Salesync</b>는 MSA 기반 Cloud POS 서비스로 <b>어디서나 매장 관리를 할 수 있는 서비스</b>입니다.<br><br>
    <a href=데모풀버전유튜브링크>Demo (Full ver.) 바로가기</a>
</p>

## ⚒ 기술 스택

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/techstack/frontTechStack.png" alt = "frontTechStack" style="width: 600px;">

### 📃 기술 스택 Detail

|Tech|Explanation|
|:---:|:---|
| JSX |- 보기 쉽고 가독성이 좋은 JSX 형식의 코드를 사용했습니다. <br>- 높은 활용도를 위해 JSX로 일부 컴포넌트 로직을 구현했습니다.  |
|React|- 재사용 가능한 컴포넌트를 작성하여 개발 효율성을 높였습니다.<br> - React Router를 사용하여 업데이트 된 부분만 새로 렌더링했습니다.|
|Recoil|- 코드 분할을 손상시키지 않고 앱 전역의 상태 관리하기 위해 Recoil을 선택했습니다.|
|Axios|- API 호출을 위해 내장함수인 FETCH 대신 Axios를 선정했습니다. <br>- 서버와의 데이터 통신을 비동기적으로 처리했습니다.|
|styled components|- CSS를 별도의 파일로 두지 않고 하나의 모듈로 관리하기 위해 **CSS-in-JS** 방식을 채택했습니다. <br>- 컴포넌트의 재사용을 위해 styled-components를 선정했습니다.|
|AWS S3|- 정적 파일로 구성된 React를 쉽게 호스팅할 수 있는 플랫폼인 Amazon S3 Bucket을 사용했습니다. <br>- 가용성이 용이하며, 사용자에게 빠른 성능을 제공합니다.|
|CloudFront|- Amazon S3와 CDN을 구성하여 성능을 최적화하고, ACM을 사용하여 SSL 인증서를 관리하기 위해 AWS CloudFront를 사용했습니다.|
|GitHub Actions|- 손쉽게 워크플로우를 설정하고, 다양한 이벤트에 대한 트리거로 각 종 이슈의 원인을 탐색하기 위해 GitHub Actions로 파이프라인을 구성했습니다.|
| BFF | - 응답 데이터를 클라이언트에서 요구되는 데이터로 파싱했습니다. <br>- 데이터를 전송하는 과정에서 민감하거니 불필요한 데이터를 숨겼습니다. |
| react-calendar | - 월별, 주별, 일별 등 다양한 표현 방식과 달력의 상태 관리를 용이하게 하기 위해 react-calendar를 선택했습니다. <br> - 사용자에게 달력으로서 최적의 편리함을 제공합니다. |
| react-modal | - 각 종 팝업을 위해 사용했으며, 이벤트 핸들링의 용이성과 중첩되어 열리는 것을 방지하는 모달 스택을 지원하는 react-modal을 사용했습니다. |
| recharts | - 원형 그래프, 꺾은선 그래프 등 사용자가 직관적으로 이해하기 쉬운 대시보드 서비스를 위해 recharts를 사용했습니다. |

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

## 🤼‍♂️ 협업 전략

### GitHub flow 방식 이용

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/githubflow.PNG">

## 🔧 Trouble Shooting

<details>

<summary>Case1. ESLint</summary>

### 1-1. 상황: ESLint으로 코드 셋업

#### 1-1.1. .eslintrc.js로 컨벤션 정의

##### 1-1.1.1. 문제 발생: GitHub Actions로 배포시 Lint 에러로 인해 컴파일 불가

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/1-1.jpg">

```
Failed to compile.

[eslint]
src/App.js
  Line 3:5:  Fragments should contain more than one child - otherwise, there’s no need for a Fragment at all  react/jsx-no-useless-fragment
  Line 3:5:  'React' must be in scope when using JSX                                                          react/react-in-jsx-scope
  Line 3:5:  JSX not allowed in files with extension '.js'                                                    react/jsx-filename-extension
  Line 4:7:  'React' must be in scope when using JSX                                                          react/react-in-jsx-scope

src/index.js
  Line 9:3:  JSX not allowed in files with extension '.js'  react/jsx-filename-extension
```

### 1-2. 해결

#### 1-2.1. 해결시도1 (해결완료): Fragment 제거 및 rules 추가

##### 1-2.1.1. App.jsx 수정

###### ./src/App.jsx

- 수정 후

```jsx
function App() {
  return <h1>GitHub Actions test v1</h1>;
}

export default App;
```

##### 1-2.1.2. .eslintrc.js 수정

###### ./src/.eslintrc.js

- 수정 후

```jsx
:
rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off'
  },
:
```

##### 1-2.1.3. 결과1: 정상 배포 완료

- 재배포

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/1-2.jpg">

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/1-3.jpg">

- 버킷 웹 사이트 엔드포인트로 접근

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/1-4.jpg">

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/1-5.jpg">

</details>

<details>

<summary>Case2. API response</summary>

### 2-1. 상황: API관련 JSX 파일 분리

#### 2-1.1. 분리 후 Axios의 응답을 console에서 확인

##### 2-1.1.1. 문제 발생: console에서 조회 불가

- 분리된 API 파일(StorePostApi.jsx)에서는 response 로그를 남길 경우 나오지만react파일(StorePage.jsx)에서 res 값을 찍을 경우 나오지 않음

##### 2-1.1.2. StorePostApi.jsx 확인

###### ./src/api/auth/signup/StorePostApi.jsx

```jsx
:
StorePostApi(data)
.then(res =>{
  if(res){
    setUserCheck(true);

    setTimeout(() => {
      navigate('/signup/stores/pos');
    }, 500);

  } else{
    throw new Error("토큰이 없습니다")
  }
})
.catch(err=>{
  console.error('API 호출 또는 토큰 발급 실패:',err)
})
:
```

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/2-1.jpg">

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/2-2.jpg">

### 2-2. 해결

#### 2-2.1. 해결시도1 (해결완료): StorePostApi.jsx에서 직접적으로 응답을 사용

##### 2-2.1.1. **StorePostApi.jsx 수정**

##### ./src/api/auth/signup/StorePostApi.jsx

- 수정 후

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/2-3.jpg">

##### 2-2.1.2. 결과: Axios의 응답이 console에서 정상 출력되는걸 확인

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/2-4.jpg">

</details>

<details>

<summary>Case3. useEffect</summary>

### 3-1. useEffect를 이용하여 PosItem 컴포넌트 렌더링 설정

#### 3-1.1. PosCategory 새로 등록

##### 3-1.1.1. 문제발생: 카테고리를 새로 등록하고 해당 카테고리를 클릭하면 정보가 안 나옴

###### ./src/components/pos/PosItem.jsx

```jsx
:
useEffect(() => {
  const fetchItems = async () => {
    try {
      const itemData = await ItemGetApi();

      setItems(itemData); // 가져온 아이템 목록으로 상태 업데이트
    } catch (err) {
      console.error(err);
    }
  };

  // selectedCategoryId가 변경될 때마다 새로운 아이템 목록을 가져옴
  fetchItems();
}, [selectedCategoryId]);
:
```

### 3-2. 해결

#### 3-2.1. 해결시도1 : 예외 처리

##### 3-2.1.1. 해결 아이디어

- PosPage내에서 상태 변동이 있으니 그 props를 받아오는 PosItem에서 한 번 더 useEffect 해야댐
- 새로운 계정으로 회원가입하면 category, item이 빈 배열로 생성
  -> null, undefined 등의 예외처리를 해야함

##### 3-2.1.2. PosItem.jsx 수정

###### ./src/components/pos/PosItem.jsx

```jsx
:
useEffect(() => {
  if (selectedCategoryId !== null && items && items.categories && items.categories.length > 0) {
    // 선택된 카테고리 또는 아이템 배열의 길이가 변경될 때 editModes를 false 값으로 초기화
    setEditModes(Array(items.categories.length).fill(false));
  }
}, [selectedCategoryId, items?.categories?.length]);

useEffect(() => {
  const fetchItems = async () => {
    try {
      const itemData = await ItemGetApi();
      
      setItems(itemData); // 가져온 아이템 목록으로 상태 업데이트
    } catch (err) {
      console.error(err);
    }
  };

  // selectedCategoryId가 변경될 때마다 새로운 아이템 목록을 가져옴
  fetchItems();
}, [selectedCategoryId]);
:
```

#### 3-2.2. 해결시도2: 비동기 처리

##### 3-2.2.1. 해결 아이디어

- useEffect가 한 파일 내에 여러 개 일때는 위에서부터 아래로 진행된다 (비동기적으로)

##### 3-2.2.2. PosItem.jsx 수정

###### ./src/components/pos/PosItem.jsx

```jsx
:
useEffect(() => {
  const fetchItems = async () => {
    try {
      const itemData = await ItemGetApi();

      setItems(itemData); // 가져온 아이템 목록으로 상태 업데이트
    } catch (err) {
      console.error(err);
    }
  };

  // selectedCategoryId가 변경될 때마다 새로운 아이템 목록을 가져옴
  fetchItems();
}, [selectedCategoryId]);

useEffect(() => {
  if (selectedCategoryId !== null && items && items.categories && items.categories.length > 0) {
    // 선택된 카테고리 또는 아이템 배열의 길이가 변경될 때 editModes를 false 값으로 초기화
    setEditModes(Array(items.categories.length).fill(false));
  }
}, [selectedCategoryId, items?.categories?.length]);
:
```

</details>

<details>

<summary>Case4. CloudFront</summary>

### 4-1. 상황: SSL 인증서를 적용하여 통신 URI가 `https://api.salesync.site`로 변경됨

#### 4-1.1. 해당하는 URI에 맞춰 JS 요청 엔드포인트 변경

##### 4-1.1.1. BaseUrl.jsx 수정

###### ./src/api/BaseUrl.jsx

- 수정 전

```jsx
const URL = "http://api.salesync.site";

export default URL;
```

- 수정 후

```jsx
const URL = "https://api.salesync.site";

export default URL;
```

##### 4-1.1.2.문제 발생: 통신 오류 및 데이터 조회 불가

- 분명 `https`로 변경했으나 `http`로 통신이 감

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/4-1.jpg">

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/4-2.jpg">

### 4-2. 해결

#### 4-2.1. 해결시도1: URI를 `//`로 시작하도록 변경

- 참조: [https://velog.io/@shin6949/HTTPS에서-HTTP-요청-블락-에러-해결하기](https://velog.io/@shin6949/HTTPS%EC%97%90%EC%84%9C-HTTP-%EC%9A%94%EC%B2%AD-%EB%B8%94%EB%9D%BD-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)

##### 4-2.1.1. BaseUrl.jsx 재수정

###### ./src/api/BaseUrl.jsx

- 수정 후

```jsx
const URL = "//api.salesync.site";

export default URL;
```

##### 4-2.1.2. 결과1: 여전히 `http`로 통신이 되는 문제 발생

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/4-3.jpg">

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/4-4.jpg">

#### 4-2.2. 해결시도2 (해결완료): CloudFront 캐시 제거

##### 4-2.2.1. 해결 아이디어

- CloudFront는 CDN으로 정적 파일이 남아있어서 이전에 사용한 **`http`** 주소로 캐시된 것이 업데이트 되지 않음.

##### 4-2.2.2. BaseUrl.jsx 수정

###### ./src/api/BaseUrl.js

- 수정 후

```jsx
const URL = "https://api.salesync.site";

export default URL;
```

##### 4-2.2.3. CloudFront 캐시 제거 스크립트 추가

###### ./.github/workflows/deploy.yml

- 수정 후

```yaml
name: Deploy to Amazon S3 bucket

on:
  push:
    branches: ["main"]

env:
  AWS_REGION: ap-northeast-2
  S3_BUCKET_NAME: salesync.site

  CLOUDFRONT_NAME: E3P5E4B2X3UGOU

: - name: CloudFront delete cache
    uses: chetan/invalidate-cloudfront-action@v2
    env:
      DISTRIBUTION: ${{ env.CLOUDFRONT_NAME }}
      PATHS: "/*"
      AWS_REGION: ${{ env.AWS_REGION }}
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

##### 4-2.2.4. 결과2: `https` 통신되며 정상 작동 확인

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/4-5.jpg">

</details>

<details>

<summary>Case5. Recoil</summary>

### 5-1. **Recoil을 사용하여 전역 상태 관리**

#### 5-1.1 Route 관련 JSX 파일에서 useRecoilState를 사용

##### 5-1.1.1. 문제 발생: 원치 않는 페이지로 이동

- 회원가입 이후 Recoil을 활용하여 회원 여부를 확인하고, PrivateRoute 및 PublicRoute에서 useRecoilState를 사용

- → 렌더링된 페이지 이후에 PrivateRoute와 PublicRoute가 다시 실행되어 의도치 않은 페이지로 이동하는 문제가 발생

### 5-2. 해결

#### 5-2.1. 해결시도1: Recoil 변수를 사용하지 않고 token의 유무로 판단

##### 5-2.1.1. PrivateRoute.jsx PublicRoute.jsx 수정

###### ./src/routes/PrivateRoute.jsx ./src/routes/PublicRoute.jsx

- 수정 후

```jsx
:
// PublicRoute.js
const userCheck = useRecoilValue(UserCheckState)

return userCheck ? element : <Navigate replace to="/"/>;

// 수정
const tokenCheck = localStorage.getItem('access_token')

return tokenCheck !==null ? element : <Navigate replace to="/"/>;
:
```

##### 5-2.1.2. 결과1: PrivateRoute와 로그아웃 오류

- PrivateRoute가 2번 실행됨
- 로그아웃 기능이 안됨

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/5-1.jpg">

#### 5-2.2. 해결시도2 (해결완료): 로그인 부분 및 특정 조건 추가

##### 5-2.2.1. Header.jsx 수정

###### ./src/componenets/common/Header.jsx

- 수정 후

```jsx
:
const logout=()=>{
  localStorage.removeItem('access_token');
  localStorage.removeItem('csrf_token');
  
  tokenCheckfunc()
}

const tokenCheckfunc=()=>{
  const tokenCheck = localStorage.getItem('access_token')

  if(tokenCheck !== null){
      setUserCheck(true)
  } else{
      setUserCheck(false)
  }
}

// 수정
const logout=()=>{
  localStorage.removeItem('access_token');
  localStorage.removeItem('csrf_token');

  setUserCheck(false)
  navigate('/')
}
:
```

##### 5-2.2.2. 해결 아이디어

- userCheck를 true로 변경 후 useEffect 가 실행되기때문에 privateRoute가 실행되어 home으로 라우팅 됨
- 조건을 추가하여 카테고리 비어있을 경우 pospage 머뭄

##### 5-2.2.3. PosCategory.jsx 수정

###### ./src/componenets/pos/PosCategory.jsx

- 수정 후

```jsx
:
useEffect(()=>{
  if(categories.length == 0){
    setCategoryState(true)
  } else{
    setCategoryState(false)
  }
},[categories])

// Header.js
// kiosk 상태
const [isKiosk , setIsKiosk] = useRecoilState(KioskState)

// 카테고리 데이터 상태 체크 [0인경우 true]
const [categoryState, setCategoryState] = useRecoilState(CategoryState)

useEffect(()=>{
  const checkCategory = async () => {
      try{
          const category = await CategoryGetApi();
          if(category.categories.length !== 0){
              setCategoryState(false)
          }else{
              setCategoryState(true)
          }
      } catch(err){
          console.log(err)
      }
  }

  checkCategory()
},[])

useEffect(() => {
  // isKiosk 값이 변경될 때마다 실행되는 useEffect를 이용하여 라우팅을 수행합니다.
  if (isKiosk) {
    navigate('/kiosk');
  } else if(!isKiosk && !categoryState){
    navigate('/home')
  }
}, [isKiosk]);

// CategoryState.js
import { atom } from "recoil";

export const CategoryState = atom({
    key: "CategoryState",
    default: false
});
:
```

</details>

<details>

<summary>Case6. Rendering</summary>

### 6-1. 상황: DashboardPage에서 Consulting 컴포넌트를 적용

#### 6-1.1. 버튼에 OnClick 이벤트를 이용해 Consulting 활성화

##### 6-1.1.1. DashboardPage.jsx 수정

###### ./src/pages/DashboardPage.jsx

- 수정 후

```jsx
:
   </LineContainer>
  </DashboardDiv>
  <ConsultingButton type='button' onClick={handlerConsulting}>컨설팅</ConsultingButton>
</ComponentDiv>
:
```

##### 6-1.1.2. 문제 발생: 너무 많은 리렌더링

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/6-1.jpg">

### 6-2. 해결

#### 6-2.1. 해결시도1: date의 값을 확정짓고 다음 컴포넌트의 props로 넘겨줌

##### 6-2.1.1. 해결 아이디어

- useState로 상태관리하는 date가 여기저기 걸려있음 - Calendar, PieChart, LineChart, Consulting API(3개)
- date를 props로 다른 페이지(or 컴포넌트)에 고정된 상수로 전달
  → 변수 date의 의존성을 제거하여 렌더링 문제 해결

##### 6-2.1.2. DashboardPage.jsx 수정

###### ./src/pages/DashboardPage.jsx

- 수정 후

```jsx
<ConsultingContainer>
  <ConsultingButton type="button" onClick={openConsult}>
    컨설팅
  </ConsultingButton>
</ConsultingContainer>
```

##### 6-2.1.3. 결과1: 새로운 페이지(팝업 형식)으로 렌더링하고 고정된 상수(date)를 전달하니 정상 작동

<img src="https://github.com/ssg-salesync/.github/blob/main/assets/troubleshooting/6-2.jpg">

</details>
