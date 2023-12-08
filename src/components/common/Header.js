import { styled } from "styled-components";
import OrderPopup from "../../popup/OrderPopup";
import PaymentPopup from "../../popup/PaymentPopup";

const HeaderDiv = styled.header`
    height: 10vh;
    width: 100%;
    background: grey;
`
function Header() {
    return (
        <HeaderDiv>
            <p>header</p>
            <p>orderPopup : <OrderPopup/> </p>
            <p>paymentPopup : <PaymentPopup/> </p>
        </HeaderDiv>    
    );
};
export default Header;