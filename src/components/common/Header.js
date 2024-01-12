import { useEffect,useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { UserCheckState } from "../../recoil/atoms/UserState";
import { KioskState } from "../../recoil/atoms/KioskState";

const HeaderDiv = styled.div`
    height: 10vh;
    width: 100%;
`
const LogoDiv = styled.div`
    height: 100%;
    width: 20%;
    float: left;
`
const Logo = styled.img`
  width: 100%; /* 이미지를 부모 컨테이너에 맞게 크기 조절 */
  height: 100%; /* 이미지를 부모 컨테이너에 맞게 크기 조절 */
  object-fit: scale-down; /* 이미지가 컨테이너에 맞게 조절될 때 가로/세로 비율 유지 및 오버플로우 숨김 */
`;
const BtDiv = styled.div`
    height: 100%;
    width: 45%;
    float: right;
    display: flex;
    justify-content: center; /* 가로 정렬 */
    align-items : center;
    // margin-right: 2%;
`
// kiosk
const BtContainer = styled.div`
    height: 100%;
    width: 40%;
    // display: flex;
    // align-items : center;
    // margin-right: 2%;
    // gap: 10%; /* 버튼 사이의 간격 조절 */
`;
const BtInnerContainer = styled.div`
    height: 100%;
    width: 43%;
    display: flex;
    align-items : center;
    justify-content: center;
    gap: 4%;
`;
const BtInner = styled.div`
    height: 55%;
    width: 35%;
    display: flex;
    align-items : center;
    justify-content: center;
`;
const Bt = styled.button`
    height: 80%;
    width: 100%;

    white-space: nowrap; /* 줄 바꿈 방지 */

    font-family: 'Pretendard-Regular';
    font-size: 110%;
    border-radius: 0.5rem;
    border: none;
    display: flex;
    justify-content: center;
    align-items : center;

    // 반응형에 맞게 폰트 크기 조정
    @media screen and (max-width: 750px) {
      font-size: 55%;
    }
    @media screen and (min-width: 750px) and (max-width: 1024px) {
      font-size: 70%;
    }
    @media screen and (min-width: 1025px) {
      font-size: 105%;
    }
`
const ToggleContainer = styled.div`
  position: relative;
//   margin-top: 8rem;
//   left: 47%;
  cursor: pointer;

  > .toggle-container {
    // width: 50px;
    // height: 24px;
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);}

    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0,200,102);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현

  } >.toggle--checked {
    left: 27px;
    transition : 0.5s
  }
`;
const Desc = styled.div`
  //설명 부분의 CSS를 구현
  text-align: center;
  margin: 2%;
  color: #fff;
  font-size: 110%;
  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 70%;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 90%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 110%;
  }
`;
/* eslint-disable */ 
function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const [userCheck,setUserCheck]=useRecoilState(UserCheckState)
    const logout=()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('csrf_token');
        tokenCheckfunc()
    }
    const myPage=()=>{
        navigate('/mypage');
    }
    const logoClick=()=>{
        tokenCheckfunc
        console.log("userCheck",userCheck)
        if(isKiosk){
            navigate('/kiosk')
        }else if(!userCheck){
            console.log("/")
            navigate('/');
        }else if(userCheck){
            console.log("/home")
            navigate('/home');
        }
    }
    const tokenCheckfunc=()=>{
        const tokenCheck = localStorage.getItem('access_token')
        console.log("tokenCheck",tokenCheck)
        if(tokenCheck !== null){
            setUserCheck(true)
        }else{
            setUserCheck(false)
            navigate("/")
        }
    }
    useEffect(()=>{
        tokenCheckfunc()
    },[userCheck])
    
    //kiosk
    const [isKiosk , setIsKiosk] = useRecoilState(KioskState)

    const kioskHandler =() => {
        setIsKiosk(!isKiosk)
    }

    useEffect(() => {
        // isKiosk 값이 변경될 때마다 실행되는 useEffect를 이용하여 라우팅을 수행합니다.
        if (isKiosk) {
            navigate('/kiosk');
        } else if(!isKiosk&&userCheck) {
            navigate('/home');
        }
    }, [isKiosk]);

     // 404 에러 페이지에서는 헤더를 숨김
     console.log('pathname',location)
     
     if (!['/', '/login', '/home', '/signup', '/signup/stores', '/signup/stores/pos', '/mypage', '/mypage/info', 
     '/mypage/info/newpassword', '/mypage/cost', '/mypage/dashboard', '/order/:tableId', '/order/:tableId/payment', 
     '/order/:tableId/payment/card', '/order/:tableId/payment/cash', '/kiosk'].includes(location.pathname)) {
        return null;
      }
     
    return (
        <HeaderDiv>
            <LogoDiv onClick={logoClick}>
                <Logo src='/img/salesync_logo.png' alt="logo"/>
            </LogoDiv>
            {userCheck&&
            <BtDiv isKiosk={isKiosk}>
                {!isKiosk ? 
                <BtInnerContainer>
                    <BtInner><Bt type="button" onClick={logout}>로그아웃</Bt></BtInner>
                    <BtInner><Bt type="button" onClick={myPage}>마이페이지</Bt></BtInner>
                    {/* <Link to='/'>
                        <Bt type="button" onClick={logout}>로그아웃</Bt></Link>
                    <Link to='/mypage'>
                        <Bt type="button">마이페이지</Bt>
                    </Link> */}
                </BtInnerContainer> 
                : <BtContainer></BtContainer>}
                <ToggleContainer // 클릭하면 토글이 켜진 상태(isKiosk)를 boolean 타입으로 변경하는 메소드가 실행
                    onClick={kioskHandler}>
                    {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
                    {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
                    <div className={`toggle-container ${isKiosk ? "toggle--checked" : null}`}/>
                    <div className={`toggle-circle ${isKiosk ? "toggle--checked" : null}`}/>
                </ToggleContainer>
                {/* Desc 컴포넌트를 활용*/}
                {/* Toggle Switch가 ON인 상태일 경우에 Desc 컴포넌트 내부의 텍스트를 'Toggle Switch ON'으로, 그렇지 않은 경우 'Toggle Switch OFF'. 조건부 렌더링을 활용. */}
                <Desc><div>KIOSK</div></Desc>
            </BtDiv>}
        </HeaderDiv>
    );
};
export default Header;