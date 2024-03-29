import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import { ComponentDivUp, TitleDiv, TotalDiv } from "../styles/CommonStyle";

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
  height: 65%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  margin-bottom: 10%;
`;
const MyPageButtonDiv = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10%;
  // justify-content: space-between;
`
// 마이페이지 버튼들
const MyPageButton = styled.button`
  
  width: 100%;
  height: 50%;

  font-family: 'Pretendard-Regular';
  font-size: 110%;
  white-space: nowrap;
  border-radius: 0.5rem;
  border:none;
  background-color: #1D56A8;
  cursor: pointer;
  color: #FFF;
  // margin: 5%;

  &:hover {
    filter: drop-shadow(0px 7px 10px rgba(29, 86, 168, 0.30));
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    font-size: 80%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 95%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 110%;
  }
`;

function MyPage() {

  const navigate = useNavigate()

  const userEdit=()=>{
    navigate('/mypage/info')
  }
  const storeEdit=()=>{
    navigate('/signup/stores/pos')
  }
  const itemCost=()=>{
    navigate('/mypage/cost')
  }
  const dashboard=()=>{
    navigate('/mypage/dashboard')
  }
  return (
    <TotalDiv>
    <ComponentDivUp>
      <TitleDiv>마이페이지</TitleDiv>
      <MyPageContainer>
        {/* <MyPageButtonDiv><Link to="/mypage/info">
          <MyPageButton type="submit">
            회원 정보 수정
          </MyPageButton>
        </Link></MyPageButtonDiv> */}
        <MyPageButtonDiv>
            <MyPageButton type="button" onClick={userEdit}>
              회원 정보 수정
            </MyPageButton>
            <MyPageButton type="button" onClick={storeEdit}>
              매장 정보 수정
            </MyPageButton>
        </MyPageButtonDiv>
        {/* <MyPageButtonDiv><Link to="/mypage/cost">
          <MyPageButton type="submit">
            물품 비용 계산
          </MyPageButton>
        </Link></MyPageButtonDiv> */}
        <MyPageButtonDiv>
            <MyPageButton type="button" onClick={itemCost}>
              물품 비용 계산
            </MyPageButton>
            <MyPageButton type="button" onClick={dashboard}>
              대시보드
            </MyPageButton>
        </MyPageButtonDiv>
      </MyPageContainer>
    </ComponentDivUp>
    </TotalDiv>    
  );
};

export default MyPage