import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { LoginPostApi } from "../api/Auth/LoginPostApi";

/* eslint-disable */

// 로그인 영역
const LoginDiv = styled.div`
width: 95%;
max-width: 600px;
height: auto;
margin: 4rem auto 0;
overflow: hidden;
background-color: white;
padding: 40px;
border-radius: 20px;
`;

// 로그인 영역 제목
const LoginDivTitle = styled.div`
height: 12rem;
font-size: 1.8rem;
font-weight: lighter;
display: flex;
align-items: center;
justify-content: center;
`;

// 아이디, 비밀번호 입력 영역
const InsertDiv = styled.div`
margin: 30px auto;
width: 400px;
text-align: center;
`;

// 아이디, 비밀번호 입력칸
const InputField = styled.input`
  border: none;
  border-bottom: 2px solid #289AFF;
`;

// 로그인 버튼
const LoginButton = styled.button`
  margin-top: 5px;
  width: 100px;
  height: 25px;
  border-radius: 5px;
  border-color: #289AFF;
  background-color: #289AFF;
  color: white;
  cursor: pointer;
`;

// 회원가입 버튼
const SignupButton = styled.button`
  margin-top: 30px;
  width: 100px;
  height: 25px;
  border-radius: 5px;
  border-color: #289AFF;
  background-color: #289AFF;
  color: white;
  cursor: pointer;
`;

function LoginPage() {

  // 로그인에 사용한 아이디, 비밀번호 상태 저장
  const [ loginData, setLoginData ] = useState({
    username: '',
    password: ''
  })

  // 로그인 버튼 클릭 이벤트핸들러
  const handlerLoginClick = () => {
    const data = {
      username: loginData.username,
      password: loginData.password
    };

    // API 통신
    LoginPostApi(data)
      .then(res => {
        console.log('로그인 성공 | 토큰 정보: ', res);
      })
      .catch(err => {
        console.error('로그인 실패 ㅣ 에러메세지: ', err);
      });
  };
  
  // 로그인, 회원가입칸에 입력시 데이터 상태 변경
  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({...loginData, [name]: value});
  };

    return (
      <LoginDiv>
        <LoginDivTitle>로그인</LoginDivTitle>
        <InsertDiv>
          <InputField
            type="text"
            name="username"
            value={loginData.username}
            onChange={handlerInputChange}
            placeholder="아이디"/>
          <br/>
          <InputField
            type="password"
            name="password"
            value={loginData.password}
            onChange={handlerInputChange}
            placeholder="비밀번호"/>
          <br/>
            <Link to="/">
              <LoginButton type="submit" onClick={handlerLoginClick}>로그인</LoginButton>
            </Link>
            <Link to="/signup">
              <SignupButton type="submit">회원가입</SignupButton>
            </Link>
        </InsertDiv>
      </LoginDiv>
    );
};

export default LoginPage;