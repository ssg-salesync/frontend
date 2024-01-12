import styled from 'styled-components';

// 로그인/회원가입/매장등록 박스
export const TotalDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 회원가입/매장등록 박스
export const ComponentDiv = styled.div`
  width: 35%;
  height: 80%;

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

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    width: 60%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 50%;
  }
  @media screen and (min-width: 1025px) {
    width: 35%;
  }
`;

// 로그인/회원가입/매장등록 제목 영역
export const TitleDiv = styled.div`
  height: 25%;
  width: 100%;
  margin-top:7%;
  // margin-bottom:3%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 230%;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    font-size: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 130%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 230%;
  }
`;

// 아이디, 비밀번호 입력 영역
export const InsertDiv = styled.div`
  height: 50%;
  width: 100%;
  margin: 1% auto;
//   text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:3%;
`;

// 정보 수정 user 영역
export const UserDiv = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  // align-items: center;
  justify-content: center;
  // margin-top:5%;
  font-size: 150%;
  font-weight: 600;
  text-align: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    font-size: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 130%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 150%;
  }
`;

// 정보 수정 title 영역
export const EditTitleDiv = styled.div`
  height: 25%;
  width: 100%;
  margin-top:7%;
  // margin-bottom:3%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 230%;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    font-size: 160%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 200%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 230%;
  }
`;