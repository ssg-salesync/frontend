import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { UserCheckState } from "../../recoil/atoms/UserState";

const HeaderDiv = styled.header`
    height: 10vh;
    width: 100%;
    background: #1C395E;
`
const LogoDiv = styled.div`
    height: 10vh;
    width: 20%;
    float: left;
    // background-color:gray;
`
const Logo = styled.img`
  width: 100%; /* 이미지를 부모 컨테이너에 맞게 크기 조절 */
  height: 100%; /* 이미지를 부모 컨테이너에 맞게 크기 조절 */
  object-fit: cover; /* 이미지가 컨테이너에 맞게 조절될 때 가로/세로 비율 유지 및 오버플로우 숨김 */
`;
const StoreNameDiv = styled.div`
    height: 10vh;
    width: 20%;
    float: right;
    // background-color:gray;
    display: flex;
    justify-content: center; /* 가로 정렬 */
    align-items : center;
`
const Bt = styled.button`
    margin :1rem;
    font-family: 'Pretendard-Regular';
`
/* eslint-disable */ 
function Header() {
    const [userCheck,setUserCheck]=useRecoilState(UserCheckState)
    const logout=()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('csrf_token');
        tokenCheckfunc()
    }
    const tokenCheckfunc=()=>{
        const tokenCheck = localStorage.getItem('access_token')
        console.log("tokenCheck",tokenCheck)
        if(tokenCheck !== null){
            setUserCheck(true)
        }else{
            setUserCheck(false)
        }
    }
    useEffect(()=>{
        tokenCheckfunc()
    },[userCheck])
    
    return (
        <HeaderDiv>
            <LogoDiv>
                <Logo src='/img/salesync_logo.png' alt="logo"/>
            </LogoDiv>
            {userCheck&&<StoreNameDiv>
                <Link to='/login'>
                    <Bt type="button" onClick={logout}>로그아웃</Bt>
                </Link>
                <Link to='/mypage'>
                    <Bt type="button">마이페이지</Bt>
                </Link>
            </StoreNameDiv>}
        </HeaderDiv>    
    );
};
export default Header;