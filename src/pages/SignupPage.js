import { Link } from "react-router-dom"
import styled from 'styled-components';
import { useState } from "react";
import { useRecoilState } from "recoil";
import { StoreState } from "../recoil/atoms/StoreState";

/* eslint-disable */

// 회원가입 영역
const SignupDiv = styled.div`
width: 95%;
max-width: 600px;
height: auto;
margin: 4rem auto 0;
overflow: hidden;
background-color: white;
padding: 40px;
border-radius: 20px;
`;

// 회원가입 영역 제목
const SignupDivTitle = styled.div`
height: 12rem;
font-size: 1.8rem;
font-weight: lighter;
display: flex;
align-items: center;
justify-content: center;
`;

// 아이디, 비밀번호 등 입력 영역
const InsertDiv = styled.div`
margin: 30px auto;
width: 400px;
text-align: center;
`;

// 아이디, 비밀번호 등 입력칸
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
  cursor: pointer;
`;

function SignupPage() {

  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    ownerName: '',
    phone: ''
  });

    const [storeState, setStoreState] = useRecoilState(StoreState);

    const handlerInputChange = (e) => {
      const { name, value } = e.target;
      setSignupData({ ...signupData, [name]: value });
    };
  
    const handlerNextClick = () => {
      setStoreState({ ...storeState, ...signupData });
    };

  return (
    <SignupDiv>
      <SignupDivTitle>회원가입</SignupDivTitle>
        <InsertDiv>
          <InputField
            type="text"
            name="username"
            value={signupData.username}
            onChange={handlerInputChange}
            placeholder="아이디"
          />
          <br />
          <InputField
            type="password"
            name="password"
            value={signupData.password}
            onChange={handlerInputChange}
            placeholder="비밀번호"
          />
          <br />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
          />
          <br />
          <InputField
            type="text"
            name="ownerName"
            value={signupData.ownerName}
            onChange={handlerInputChange}
            placeholder="이름"
          />
          <br />
          <InputField
            type="text"
            name="phone"
            value={signupData.phone}
            onChange={handlerInputChange}
            placeholder="전화번호"
          />
          <br />
          <Link to="/signup/stores" >
        <NextButton type="button" onClick={handlerNextClick}>다음</NextButton>
      </Link>
        </InsertDiv>
    </SignupDiv>
  );
}

export default SignupPage;