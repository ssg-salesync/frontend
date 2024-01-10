import {React ,useState} from "react";
import { useRecoilState} from 'recoil';
import styled from 'styled-components';
import { deleteOrderState,deleteTotalPriceState } from "../components/func/AtomData";
import { PayCompleteState } from "../recoil/atoms/ItemState";
import OrderPopup from "../popup/OrderPopup";

const BtDiv= styled.div`
    height:80vh;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const OrderBt = styled.button`
    height:20%;
    width:20%;
    border: none;
    font-family: 'Pretendard-Regular';
    font-size: 1rem;
    border-radius: 0.6rem;
    background: #D9D9D9;
    &:hover {
        background-color: #e0e0e0;
    }
`
function Kiosk(){
    const [orderModalOn, setOrderModalOn] = useState(false);
    // const [selectedTableId, setSelectedTableId] = useState(null);
    const [closeAllPopup,setCloseAllPopup] = useRecoilState(PayCompleteState)
    
    const deleteOrder = deleteOrderState()
    const deleteTotalPrice= deleteTotalPriceState()
    const openOrderPopup = () => {
        setOrderModalOn(true)
        document.body.style.overflow = "hidden";
    }
    const closeOrderPopup = () => {
        deleteOrder()
        deleteTotalPrice()
        setOrderModalOn(false)
        setCloseAllPopup(false)
        document.body.style.overflow = "unset"        
        // console.log("closeOrderPopup-tableId",tableId)
    }
    return(
        <BtDiv>
            <OrderBt type="button" onClick={(e) => { e.preventDefault(); openOrderPopup();}}>주문하기</OrderBt>
            {orderModalOn && <OrderPopup openOrderPopup={openOrderPopup} closeOrderPopup={closeOrderPopup} tableId={0}/>}
        </BtDiv>
    )
}
export default Kiosk