import { Link } from "react-router-dom";
import { styled } from "styled-components";
// import { TableState} from "../../../public/Logo.png"

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
function Header() {
    const logout=()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('csrf_token');
    }
    return (
        <HeaderDiv>
            <LogoDiv>
                {/* Salesync */}
                <Logo src='/img/Logo.png' alt="logo"/>
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