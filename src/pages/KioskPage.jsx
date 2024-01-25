import {useState,useEffect} from "react";
import { useSetRecoilState} from 'recoil';
import styled, {keyframes,css} from 'styled-components';
import { MdOutlineTableBar} from "react-icons/md";
import { IoBagHandleOutline} from "react-icons/io5";
import { deleteOrderState,deleteTotalPriceState } from "../components/func/AtomData";
import { PayCompleteState } from "../recoil/atoms/ItemState";
import OrderPopup from "../popup/OrderPopup";

// fadeIn 애니메이션 키프레임
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const BtDiv = styled.div`
    height:80vh;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2%;
`
const OrderBt = styled.button`
    height: 30%;
    width: 20%;
    border: none;
    box-shadow: 3px 4px 12.6px 0px rgba(0, 0, 0, 0.25);
    font-family: 'Pretendard-Regular';
    font-size: 180%;
    font-weight: 800;
    border-radius: 0.6rem;
    background: #FFF;
    white-space: nowrap;
    color: #000000;

    cursor: pointer;

    // 애니메이션 적용
    opacity: 0;
    ${({ visible }) =>
        visible &&
        css`
            animation: ${fadeIn} 0.5s ease-in-out forwards;
        `}

    &:hover {
        filter: drop-shadow(0px 7px 10px rgba(29, 86, 168, 0.30));
    }

    // 반응형에 맞게 폰트 크기 조정
    @media screen and (max-width: 768px) {
        width:25%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width:23%;
    }
    @media screen and (min-width: 1025px) {
        width:20%;
    }
`
const TableIcon = styled(MdOutlineTableBar)`
  width: 1.8em;
  height: 1.8em;
  margin-bottom: 5%;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    width: 1em;
    height: 1em;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 1em;
    height: 1em;
  }
  @media screen and (min-width: 1025px) {
    width: 1.8em;
    height: 1.8em;
  }
`;
const TogoIcon = styled(IoBagHandleOutline)`
  width: 1.8em;
  height: 1.8em;
  margin-bottom: 5%;
  
  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    width: 1em;
    height: 1em;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 1em;
    height: 1em;
  }
  @media screen and (min-width: 1025px) {
    width: 1.8em;
    height: 1.8em;
  }
`;
function Kiosk(){
    const [orderModalOn, setOrderModalOn] = useState(false);
    const setCloseAllPopup = useSetRecoilState(PayCompleteState)
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
    // 몇초 후에 주문하기 버튼이 나타나도록 설정
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsButtonVisible(true);
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

    return(
        <BtDiv>
            <OrderBt type="button" onClick={(e) => { e.preventDefault(); openOrderPopup();}} visible={isButtonVisible} ><TableIcon/><br/>매장</OrderBt>
            <OrderBt type="button" onClick={(e) => { e.preventDefault(); openOrderPopup();}} visible={isButtonVisible} ><TogoIcon/><br/>포장</OrderBt>
            {orderModalOn && <OrderPopup openOrderPopup={openOrderPopup} closeOrderPopup={closeOrderPopup} tableId={0}/>}
        </BtDiv>
    )
}
export default Kiosk