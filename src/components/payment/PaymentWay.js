import { styled } from 'styled-components';
import CardPopup from '../../popup/CardPopup';
import CashPopup from '../../popup/CashPopup';

const WayDiv = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items : center;

`
const ButtonDiv = styled.div`
    width: 80%;
    height: 10%;
    margin: 1rem;
    display: flex;
    justify-content: center;
    box-sizing: border-box; /* padding, border가 너비에 포함되도록 함 */
`
const Button = styled.button`
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
`
function PaymentWay() {

    return (
        <WayDiv>
            <ButtonDiv>
                {/* <Button type='button' onClick={cardPopupOpen}>카드</Button> */}
                <CardPopup/>
            </ButtonDiv>
            <ButtonDiv>
                <CashPopup/>
            </ButtonDiv>
            <ButtonDiv>
                <Button type='button'>간편결제</Button>
            </ButtonDiv>        
        </WayDiv>
    );
};

export default PaymentWay;