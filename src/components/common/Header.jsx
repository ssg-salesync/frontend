import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { UserCheckState } from "../../recoil/atoms/UserState";
import { KioskState } from "../../recoil/atoms/KioskState";
import { CategoryGetApi } from "../../api/pos/category/CategoryGetApi";
import { CategoryState } from "../../recoil/atoms/CategoryState";

const HeaderDiv = styled.div`
    height: 10vh;
    width: 100%;
`;

const LogoDiv = styled.div`
    height: 100%;
    width: 20%;
    float: left;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
  cursor: pointer;
`;

const BtDiv = styled.div`
    height: 100%;
    width: 45%;
    float: right;
    display: flex;
    justify-content: center; /* 가로 정렬 */
    align-items : center;
    // margin-right: 2%;
`;

const BtContainer = styled.div`
    height: 100%;
    width: 43%;
    // display: flex;
    // align-items : center;
    // margin-right: 2%;
    // gap: 10%; /* 버튼 사이의 간격 조절 */
    // 반응형
    @media screen and (max-width: 768px) {
        width: 55%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 49%;
    }
`;

const BtInnerContainer = styled.div`
    height: 100%;
    width: 43%;
    display: flex;
    align-items : center;
    justify-content: center;
    gap: 4%;

    // 반응형
    @media screen and (max-width: 768px) {
        gap: 10%;
        width: 55%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 49%;
        gap: 7%;
    }
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
    white-space: nowrap;

    font-family: 'Pretendard-Regular';
    font-size: 110%;
    border-radius: 0.3rem;
    border: none;
    display: flex;
    justify-content: center;
    align-items : center;
    background-color: #2D69C4;
    color: #FFF;
    cursor: pointer;

    &:hover {
        filter: drop-shadow(0px 7px 10px rgba(29, 86, 168, 0.30));
    }

    // 반응형
    @media screen and (max-width: 768px) {
      font-size: 55%;
      height: 55%;
      width: 150%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 70%;
      height: 63%;
      width: 130%;
    }
    @media screen and (min-width: 1025px) {
      font-size: 105%;
    }
`;

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;

  > .toggle-container {
    width: 58px;
    height: 30px;
    
    // 반응형
    @media screen and (max-width: 768px) {
        width: 38px;
        height: 20px;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 48px;
        height: 25px;
    }

    border-radius: 30px;
    background-color: #868686;}

    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: #2D69C4;
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 28px;
    height: 28px;

    // 반응형
    @media screen and (max-width: 768px) {
        width: 18px;
        height: 18px;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 23px;
        height: 23px;
    }
    
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s

    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 29px;
    transition : 0.5s

    // 반응형
    @media screen and (max-width: 768px) {
        left: 19px;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        left: 24px;
    }    
  }
`;

const Desc = styled.div`
  text-align: center;
  margin: 2%;
  color: black;
  font-size: 110%;
  font-weight: 1000;
  cursor: default;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    font-size: 70%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 90%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 110%;
  }
`;

function Header() {

    const navigate = useNavigate();

    const setUserCheck = useSetRecoilState(UserCheckState)
    
    const logout=()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('csrf_token');

        setUserCheck(false)
        
        navigate('/')
    }

    const tokenCheckfunc=()=>{
        const tokenCheck = localStorage.getItem('access_token')

        if(tokenCheck !== null){
            setUserCheck(true)
        } else{
            setUserCheck(false)
        }
    }

    const myPage=()=>{
        navigate('/mypage');
    }

    // kiosk 상태
    const [isKiosk , setIsKiosk] = useRecoilState(KioskState)

    const logoClick=()=>{
        tokenCheckfunc()
        
        if(isKiosk){
            navigate('/kiosk')
        } else{
            navigate('/home')
        }
    }

    // 카테고리 데이터 상태 체크 [0인경우 true]
    const [categoryState, setCategoryState] = useRecoilState(CategoryState)

    useEffect(()=>{
        const checkCategory = async () => {
            try{
                const category = await CategoryGetApi();
                if(category.categories.length !== 0){
                    setCategoryState(false)
                } else{
                    setCategoryState(true)
                }            
            } catch(err){
                if (err.response && err.response.status >= 500 && err.response.status < 600) {
                    // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
                    navigate("/500");
                }
            }
        }

        checkCategory()
    },[])

    const kioskHandler =() => {
        if(categoryState){
            alert('메뉴를 등록해주세요')
        } else{
            setIsKiosk(!isKiosk)
        }
    }

    useEffect(() => {
        // isKiosk 값이 변경될 때마다 실행되는 useEffect를 이용하여 라우팅을 수행합니다.
        if (isKiosk) {
            navigate('/kiosk');
        } else if(!isKiosk && !categoryState){
            navigate('/home')
        }
    }, [isKiosk]);
     
    return (
        <HeaderDiv>
            <LogoDiv onClick={logoClick}>
                <Logo src='/img/salesync_logo.png' alt="logo"/>
            </LogoDiv>
            <BtDiv isKiosk={isKiosk}>
                {!isKiosk ? 
                <BtInnerContainer>
                    <BtInner><Bt type="button" onClick={logout}>로그아웃</Bt></BtInner>
                    <BtInner><Bt type="button" onClick={myPage}>마이페이지</Bt></BtInner>
                </BtInnerContainer> 
                : <BtContainer/>}
                <ToggleContainer onClick={kioskHandler}>
                    <div className={`toggle-container ${isKiosk ? "toggle--checked" : null}`}/>
                    <div className={`toggle-circle ${isKiosk ? "toggle--checked" : null}`}/>
                </ToggleContainer>
                <Desc>KIOSK</Desc>
            </BtDiv>
        </HeaderDiv>
    );
};
export default Header;