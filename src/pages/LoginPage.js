import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { LoginPostApi } from "../api/Auth/LoginPostApi";

/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 로그인 제목 영역
const TitleDiv = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 100%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 200%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 300%;
  }
`;

// 아이디, 비밀번호 입력 영역
const InsertDiv = styled.div`
  height: 40%;
  width: 100%;
  margin: 30px auto;
  width: 400px;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// 버튼 영역
const ButtonDiv = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 아이디, 비밀번호 입력칸
const InputField = styled.input`
  border: none;
  border-bottom: 2px solid #289AFF;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 70%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 85%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 100%;
  }
`;

// 로그인 버튼
const LoginButton = styled.button`
  width: 120%;
  height: 25%;
  margin-left: -20%;
  border-radius: 15%;
  border-color: #289AFF;
  background-color: #289AFF;
  color: white;
  cursor: pointer;

// 반응형에 맞게 폰트 크기 조정
@media screen and (max-width: 480px) {
  font-size: 50%;
}

@media screen and (min-width: 481px) and (max-width: 1024px) {
  font-size: 100%;
}

@media screen and (min-width: 1025px) {
  font-size: 150%;
}
`;

// 회원가입 버튼
const SignupButton = styled.button`
  width: 100%;
  height: 30%;
  margin-left: 20%;
  border-radius: 15%;
  border-color: #289AFF;
  background-color: #289AFF;
  color: white;
  cursor: pointer;

// 반응형에 맞게 폰트 크기 조정
@media screen and (max-width: 480px) {
  font-size: 50%;
}

@media screen and (min-width: 481px) and (max-width: 1024px) {
  font-size: 100%;
}

@media screen and (min-width: 1025px) {
  font-size: 150%;
}
`;

function LoginPage() {

  // 로그인에 사용한 아이디, 비밀번호 상태 저장
  const [ loginData, setLoginData ] = useState({
    username: '',
    password: ''
  })

  // 로그인, 회원가입칸에 입력시 데이터 상태 변경
  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({...loginData, [name]: value});
  };
 
  // 네비게이트 훅
  const navigate = useNavigate();

  const usernameRef = useRef(null);

  // 로그인 버튼 클릭 이벤트핸들러
  const handlerLoginClick = () => {

    // 모든 필드가 입력되지 않으면 다음 페이지 안 넘어가게 조건 부여
    if (
      !loginData.username ||
      !loginData.password
    ) {

      alert('모든 항목을 입력해주세요.');
      return; // 다음 페이지로 넘어가지 않음
    };

    // API와 통신할 전체 데이터
    const data = {
      username: loginData.username,
      password: loginData.password
    };

  // API 통신
    LoginPostApi(data)
      .then(res => {
        console.log('로그인 성공 | 토큰 정보: ', res);

        // 홈으로 넘어감
        navigate("/");
      })
      .catch(err => {
        console.error('로그인 실패 ㅣ 에러메세지: ', err.response.status);
        if (err.response.status === 400) {
          alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');

          setLoginData({ ...loginData, username: '', password: ''});

          if (usernameRef.current) {
            usernameRef.current.focus();
          };

          return;
        };
    });
  };

  console.log('api통신할 전체 데이터: ', loginData)

  return (
    <ComponentDiv>
      <TitleDiv>로그인</TitleDiv>
      <InsertDiv>
        <InputField
          type="text"
          name="username"
          value={loginData.username}
          onChange={handlerInputChange}
          placeholder="아이디"
          ref={usernameRef}
          />
        <br/>
        <InputField
          type="password"
          name="password"
          value={loginData.password}
          onChange={handlerInputChange}
          placeholder="비밀번호"
          />
        <br/>
      </InsertDiv>
      <ButtonDiv>
        <div>
          <LoginButton type="submit" onClick={handlerLoginClick}>로그인</LoginButton>
        </div>
        <Link to="/signup">
          <SignupButton type="submit">회원가입</SignupButton>
        </Link>
      </ButtonDiv>
    </ComponentDiv>
  );
};

export default LoginPage;