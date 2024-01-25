import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { UserCheckState } from '../recoil/atoms/UserState';
import "../fonts/fonts.css"

/* eslint-disable */
const TotalDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  flex-direction: column;
`
const SplashDiv = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: #2D69C4;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
const UnderDiv = styled.div`
  width: 100%;
  height: 20%;
  margin-top: 1%;
  display: flex;
  justify-content: center;
  gap: 0%;

  opacity: 0;
  animation: fadeIn 3s forwards;
`
const ProfDiv = styled.div`
  font-size: 120%;
  // margin-right: 4%;
  margin-left: 5%;
`
// 로고 이미지
const LogoImg = styled.img`
  width: 75px;
  height: 75px;
  transform: translate(-5%, -4%);
  animation: fadeIn 1s forwards;
`
const FadeInItemDiv = styled.div`
  opacity: 0;
  animation: fadeIn 1s forwards;
  animation-delay: ${({ index }) => `${0.15 * (index + 1)}s`};
`
const SplashTextDiv = styled.div`
  text-align: center;
  font-family: 'GiantsRegular', sans-serif;
  font-size: 5em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const BtDiv = styled.div`
  height: 30%;
  width: 15%;
  gap: 5%;
  display: flex;
  // flex-direction: row;
  justify-content: center;
  margin-top: 1%;
  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    margin-left: 20%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin-left: 10%;
  }
  @media screen and (min-width: 1025px) {
    margin-left: 2%;
  }
`
// 로그인/회원가입 버튼
const Button = styled.button`
  width: 90px;
  height: 30px;
  // padding: 2px 16px;
  // padding: 0;
  border-radius: 0.5625rem;
  border:none;
  background-color: #1D56A8;
  cursor: pointer;

  color: #FFF;
  font-family: 'Pretendard-Regular';
  font-size: 90%;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap; // 버튼 내 줄바꿈 금지

  &:hover {
    // background-color: #e0e0e0;
    filter: drop-shadow(0px 7px 10px rgba(29, 86, 168, 0.30));
  }

  // 반응형에 맞게 폰트 크기 조정
  // @media screen and (max-width: 768px) {
  //   font-size: 50%;
  //   width: 50%;
  //   height: 70%;
  // }
  // @media screen and (min-width: 768px) and (max-width: 1024px) {
  //   font-size: 70%;
  //   width: 30%;
  //   height: 70%;
  // }
  @media screen and (min-width: 1025px) {
      width: 80px;
      padding: 0;
  }
`;
function WelcomePage() {

  const navigate = useNavigate();
  const userCheck = useRecoilValue(UserCheckState);

  useEffect(() => {
    {userCheck && 
        setTimeout(() => {
          navigate('/home')
      }, 3000);
    }
  }, []);

  // const splashStyle = {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: '80vh',
  // };

  // const splashTextStyle = {
  //   textAlign: 'center',
  //   fontFamily: 'Giants-Bold',
  //   fontSize: '5em',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // };

  // const logoStyle = {
  //   width: '130%',
  //   height: '130%',
  //   transform: 'translate(-5%, -4%)',
  //   animation: 'fadeIn 1s forwards',
  // };
  // const salesyncStyle = {
  //   color: '#2D69C4',
  // };

  const moveLogin=()=>{
    console.log("click Login")
    navigate('/login')
  }
  const moveSignUp=()=>{
    console.log("click signup")
    navigate('/signup')
  }
  
  return (
    <TotalDiv>
    <SplashDiv>
        <SplashTextDiv>
          <LogoImg src="/img/only_logo.png" alt="logo"/>
          {Array.from('Salesync').map((char, index) => (
            <FadeInItemDiv key={index} index={index}>
              {char}
            </FadeInItemDiv>
          ))}
        </SplashTextDiv>      
    </SplashDiv>
    <UnderDiv style={{ animationDelay: `${0.15 * (Array.from('Sale').length + 3)}s` }}>
      <ProfDiv>
        스마트한 AI 클라우드 포스 <br/>
        어디서나 웹으로 간편하게
      </ProfDiv>
      <BtDiv>
        <Button onClick={moveLogin}>로그인</Button>
        <Button onClick={moveSignUp}>회원가입</Button>
      </BtDiv>
    </UnderDiv>
    </TotalDiv>
  );
};


export default WelcomePage;