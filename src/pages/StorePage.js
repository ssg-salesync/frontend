import { Link } from "react-router-dom"
import styled from 'styled-components';

// 매장정보 영역
const StoreDiv = styled.div`
width: 95%;
max-width: 600px;
height: auto;
margin: 4rem auto 0;
overflow: hidden;
background-color: white;
padding: 40px;
border-radius: 20px;
`;

// 매장정보 영역 제목
const StoreDivTitle = styled.div`
height: 12rem;
font-size: 1.8rem;
font-weight: lighter;
display: flex;
align-items: center;
justify-content: center;
`;

// 매장명, 주소 등 입력 영역
const InsertDiv = styled.div`
margin: 30px auto;
width: 400px;
text-align: center;
`;

// 매장명, 주소 등 입력칸
const InputField = styled.input`
  border: none;
  border-bottom: 2px solid #289AFF;
`;

// 다음 버튼
const NextButton = styled.button`
  margin-top: 5px;
  width: 100px;
  height: 25px;
  border-radius: 5px;
  border-color: #289AFF;
  background-color: #289AFF;
  color: white;
`;

function StorePage() {
    return (
      <StoreDiv>
        <StoreDivTitle>매장을 등록해주세요</StoreDivTitle>
        <InsertDiv>
          <InputField type="text" placeholder="매장명"/>
          <br/>
          <InputField type="text" placeholder="매장명"/>
          <br/>
          <InputField type="text" placeholder="주소"/>
          <br/>
          <InputField type="text" placeholder="업종"/>
          <br/>
            <Link to="/signup/stores/pos">
              <NextButton type="submit">다음</NextButton>
            </Link>
        </InsertDiv>
      </StoreDiv>
    );
};

export default StorePage