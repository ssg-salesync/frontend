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
    background-color:gray;
    text-align: center;
    justify-content: center; /* 가로 정렬 */
`
function Header() {
    return (
        <HeaderDiv>
            <LogoDiv>
                Salesync
                <img src='.../assets/Logo.png' alt="logo"/>
            </LogoDiv>
            <StoreNameDiv>
            <Link to='/mypage'>
                <h2>store</h2>
            </Link>
            </StoreNameDiv>
        </HeaderDiv>    
    );
};
export default Header;