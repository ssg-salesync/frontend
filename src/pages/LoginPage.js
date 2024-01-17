import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useSetRecoilState } from "recoil";
import {LoginPostApi} from "../api/auth/login/LoginPostApi"
import {TotalDiv,ComponentDiv,TitleDiv,InsertDiv, MsgDiv} from "../styles/CommonStyle"
import { UserCheckState } from "../recoil/atoms/UserState";

/* eslint-disable */

// 컴포넌트 전체 영역
// const ComponentDiv = styled.div`
//   // height: 80vh;
//   width: 38.25rem;
//   height: 33.75rem;
  
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   border-radius: 2.125rem;
//   border: 2px solid #FFF;
//   background: rgba(255, 255, 255);
//   box-shadow: 3px 4px 12.6px 0px rgba(0, 0, 0, 0.25);
//   backdrop-filter: blur(10px);
// `;

// 페이지 제목 영역
// const TitleDiv = styled.div`
//   height: 25%;
//   width: 100%;
//   margin-top:5%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.5rem;
//   font-weight: 600;
//   text-align: center;

//   // 반응형에 맞게 폰트 크기 조정
//   // @media screen and (max-width: 480px) {
//   //   font-size: 100%;
//   // }

//   // @media screen and (min-width: 481px) and (max-width: 1024px) {
//   //   font-size: 200%;
//   // }

//   // @media screen and (min-width: 1025px) {
//   //   font-size: 300%;
//   // }
// `;

// 아이디, 비밀번호 입력 영역
// const InsertDiv = styled.div`
//   height: 40%;
//   width: 100%;
//   margin: 30px auto;
//   text-align: center;
//   align-items: center;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// 페이지 제목 영역
const LogoDiv = styled.div`
  height: 25%;
  width: 100%;
  margin-top: 7%;
  // border: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Logo = styled.img`
  object-fit: contain; // 이미지가 상자 안에 맞게 조절되도록 설정
  max-width: 70%;     // 최대 너비를 100%로 지정
  max-height: 80%;    // 최대 높이를 100%로 지정
`
// // 아이디, 비밀번호 입력칸
const InputField = styled.input`
  border: none;
  border-bottom: 2px solid #1C395E;
  margin:3%;
  width: 45%;
  height: 15%;
  font-family: Pretendard-Regular;
  font-size: 120%;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    font-size: 40%;
  }  
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 90%;
  }  
  @media screen and (min-width: 1025px) {
    font-size: 120%;
  }
`;
// 버튼 영역
const ButtonDiv = styled.div`
  height: 20%;
  width: 100%;
  margin-bottom:7%;
  gap: 5%;
  display: flex;
  align-items: center;
  justify-content: center;

  // 반응형
  @media screen and (max-width: 768px) {
    margin-bottom: 7%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin-bottom: 7%;
  }
  @media screen and (min-width: 1025px) {
    margin-top:3%;
  }
`;
// 로그인/회원가입 버튼
const Button = styled.button`
  // width: 20%;
  // height: 40%;
  padding: 9px 27px;
  border-radius: 0.5625rem;
  border:none;
  background-color: #1D56A8;
  cursor: pointer;

  color: #FFF;
  font-family: 'Pretendard-Regular';
  // font-size: 130%;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap; // 버튼 내 줄바꿈 금지

  &:hover {
    // background-color: #e0e0e0;
    filter: drop-shadow(0px 7px 10px rgba(29, 86, 168, 0.30));
  }

  // 반응형
  @media screen and (max-width: 768px) {
    font-size: 40%;
    padding: 5px 15px;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 90%;
    padding: 8px 20px;
  }
  @media screen and (min-width: 1025px) {
    font-size: 120%;
  }
`;
function LoginPage() {
  // 경고메세지
  const [msg, setMsg] =useState("")
 
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

  const setUserCheck = useSetRecoilState(UserCheckState)
  // 회원가입 버튼 클릭
  const handlerSignUpClick = () =>{
    navigate("/signup")
  }
  // 로그인 버튼 클릭 이벤트핸들러
  const handlerLoginClick = () => {

    // 모든 필드가 입력되지 않으면 다음 페이지 안 넘어가게 조건 부여
    if (
      !loginData.username ||
      !loginData.password
    ) {

      setMsg('모든 항목을 입력해주세요.');

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
        setUserCheck(true)
        // 홈으로 넘어감
        navigate("/home");
      })
      .catch(err => {
        console.error('로그인 실패 ㅣ 에러메세지: ', err.response.status);
        if (err.response.status === 400) {
          // alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
          setMsg('로그인에 실패했습니다.\n 아이디와 비밀번호를 확인해주세요.');

    if (err.response.status === 400) {
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');

      setLoginData({ ...loginData, username: '', password: '' });

      if (usernameRef.current) {
        usernameRef.current.focus();
      };
    } 
  });
};

  // console.log('api통신할 전체 데이터: ', loginData)

  return (
    <TotalDiv>
    <ComponentDiv>
      {/* <TitleDiv>로그인을 위해 아이디와<br/>비밀번호를 입력해주세요.</TitleDiv> */}
      <LogoDiv><Logo src='/img/salesync_logo.png' alt="logo"/></LogoDiv>
      <InsertDiv>
        <InputField
          type="text"
          name="username"
          value={loginData.username}
          onChange={handlerInputChange}
          placeholder="아이디"
          ref={usernameRef}
          />
        <InputField
          type="password"
          name="password"
          value={loginData.password}
          onChange={handlerInputChange}
          placeholder="비밀번호"
          />
        <br/>
        <MsgDiv>{msg}</MsgDiv>
      </InsertDiv>
      <ButtonDiv>
        {/* <div> */}
          <Button type="button" onClick={handlerLoginClick}>로그인</Button>
        {/* </div> */}
        {/* <Link to="/signup"> */}
          <Button type="button" onClick={handlerSignUpClick}>회원가입</Button>
        {/* </Link> */}
      </ButtonDiv>
    </ComponentDiv>
    </TotalDiv>
  );
};

export default LoginPage;