import { styled } from "styled-components";
import OrderPopup from "../../popup/OrderPopup";

const HeaderDiv = styled.header`
    height: 10vh;
    width: 100%;
    background: grey;
`
function Header() {
    return (
        <HeaderDiv>
            header
            <OrderPopup/>
        </HeaderDiv>    
    );
};
export default Header;