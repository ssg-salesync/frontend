import styled from 'styled-components';

// 로그인/회원가입/매장등록 박스
export const TotalDiv = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 회원가입/매장등록 박스
export const ComponentDiv = styled.div`
  // height: 80vh;
  width: 38.25rem;
  height: 33.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 2.125rem;
  border: 2px solid #FFF;
  background: rgba(255, 255, 255);
  box-shadow: 3px 4px 12.6px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);

  // 슬라이드 애니매이션 효과
  transform: translateX(100%);
  animation: slideIn 0.5s forwards;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

// 로그인/마이페이지 박스
export const ComponentDivUp = styled.div`
  // height: 80vh;
  width: 38.25rem;
  height: 33.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 2.125rem;
  border: 2px solid #FFF;
  background: rgba(255, 255, 255);
  box-shadow: 3px 4px 12.6px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);

  // 슬라이드 애니매이션 효과
  transform: translateY(100%);
  animation: slideUp 0.5s forwards;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

// 로그인/회원가입/매장등록 제목 영역
export const TitleDiv = styled.div`
  height: 25%;
  width: 100%;
  margin-top:5%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;

  // 반응형에 맞게 폰트 크기 조정
  // @media screen and (max-width: 480px) {
  //   font-size: 100%;
  // }

  // @media screen and (min-width: 481px) and (max-width: 1024px) {
  //   font-size: 200%;
  // }

  // @media screen and (min-width: 1025px) {
  //   font-size: 300%;
  // }
`;

// 아이디, 비밀번호 입력 영역
export const InsertDiv = styled.div`
  height: 40%;
  width: 100%;
  margin: 30px auto;
//   text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

