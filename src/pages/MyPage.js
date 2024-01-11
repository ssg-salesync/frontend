import { Link } from "react-router-dom"
import styled from 'styled-components';
import { ComponentDiv, TitleDiv, TotalDiv } from "../styles/CommonStyle";

/* eslint-disable */

// 컴포넌트 전체 영역
// const ComponentDiv = styled.div`
//     height: 80vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `;

// 맨 위 마이페이지 글자 영역
// const TitleDiv = styled.div`
//   height: 20%;
//   display: flex;
//   align-items: center;

//   // 반응형에 맞게 폰트 크기 조정
//   @media screen and (max-width: 480px) {
//     font-size: 70%;
//   }

//   @media screen and (min-width: 481px) and (max-width: 1024px) {
//     font-size: 85%;
//   }

//   @media screen and (min-width: 1025px) {
//     font-size: 100%;
//   }
// `;

// 버튼들 전체 영역(위에 글자 제외)
const MyPageContainer = styled.div`
  // height: 60%;
  // width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MyPageButtonDiv = styled.div`
  width: 60%;
  height: 50%;
  display: flex;
  // justify-content: center;
  justify-content: space-between;
`
// 마이페이지 버튼들
const MyPageButton = styled.button`
  width: 130%;
  height: 60%;

  font-family: 'Pretendard-Regular';
  font-size: 110%;
  border-radius: 0.5rem;
  border:none;
  background-color: #00ADEF;
  cursor: pointer;
  color: #FFF;
  margin: 5%;

  &:hover {
    background-color: #e0e0e0;
  }
`;

function MyPage() {
  return (
    <TotalDiv>
    <ComponentDiv>
      <TitleDiv>마이페이지</TitleDiv>

      <MyPageContainer>
        {/* <MyPageButtonDiv><Link to="/mypage/info">
          <MyPageButton type="submit">
            회원 정보 수정
          </MyPageButton>
        </Link></MyPageButtonDiv> */}
        <MyPageButtonDiv>
          <Link to="/mypage/info">
            <MyPageButton type="submit">
              회원 정보 수정
            </MyPageButton>
          </Link>
          <Link to="/signup/stores/pos">
            <MyPageButton type="submit">
              매장 정보 수정
            </MyPageButton>
          </Link>
        </MyPageButtonDiv>
        {/* <MyPageButtonDiv><Link to="/mypage/cost">
          <MyPageButton type="submit">
            물품 비용 계산
          </MyPageButton>
        </Link></MyPageButtonDiv> */}
        <MyPageButtonDiv>
          <Link to="/mypage/cost">
            <MyPageButton type="submit">
              물품 비용 계산
            </MyPageButton>
          </Link>
          <Link to="/mypage/dashboard">
            <MyPageButton>
              대&nbsp;&nbsp;&nbsp;시&nbsp;&nbsp;&nbsp;보&nbsp;&nbsp;&nbsp;드
            </MyPageButton>
          </Link>
        </MyPageButtonDiv>
      </MyPageContainer>
    </ComponentDiv>
    </TotalDiv>    
  );
};

export default MyPage