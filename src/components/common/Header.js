import { Link } from "react-router-dom";
import { styled } from "styled-components";

const HeaderDiv = styled.header`
    height: 10vh;
    width: 100%;
`
const LogoDiv = styled.div`
    height: 10vh;
    width: 20%;
    float: left;
    background-color:gray;
`
const StoreNameDiv = styled.div`
    height: 10vh;
    width: 20%;
    float: right;
    background-color:gray;display: flex;
    display: flex;
    justify-content: center; /* 가로 정렬 */
    align-items : center;
`
const Bt = styled.button`
    margin :1rem;
`
function Header() {
    const logout=()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('csrf_token');
    }
    return (
        <HeaderDiv>
            <LogoDiv>
                Salesync
                <img src='.../assets/Logo.png' alt="logo"/>
            </LogoDiv>
            <StoreNameDiv>
                <Link to='/login'>
                    <Bt type="button" onClick={logout}>로그아웃</Bt>
                </Link>
                <Link to='/mypage'>
                    <Bt type="button">마이페이지</Bt>
                </Link>
            </StoreNameDiv>
        </HeaderDiv>    
    );
};
export default Header;