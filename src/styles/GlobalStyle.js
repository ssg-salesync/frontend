import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
    ${reset}
    :root{
        // width: 100vw;
        // height: 100vh;
    }
    // HTML 및 body 요소에 대한 기본 스타일 설정
    html,
    body {
      width: 2048px;
      height: 1536px;
      margin: 0px;
    }
}
`;

export default GlobalStyle;