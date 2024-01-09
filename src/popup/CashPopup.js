import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useRecoilValue, useResetRecoilState, useRecoilState } from "recoil";   // 읽기 전용
import { styled } from 'styled-components';
import { IoArrowBackSharp } from "react-icons/io5";
import { PayCompleteState, TableState, TotalPrice } from '../recoil/atoms/ItemState';
import { getAtom } from '../components/func/AtomData';
import { PayPostApi } from '../api/pay/PayPostApi';

const slideInAnimation = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const modalStyle ={
    content: {
        top: '8%',
        left: '9%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // 모달의 너비
        height: '80%', // 모달의 높이
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(100deg, #E4F4FF 9.3%, #E0F6FF 55.65%, #D2E5FC 99.2%)',
        animation: 'slideIn 0.5s forwards', // 애니메이션 효과 적용
      },
};

const BackBt = styled(IoArrowBackSharp)`
  width:5%;
  height:5%;
`
// style요소에 css 애니메이션 요소를 추가
const style = document.createElement('style');
style.appendChild(document.createTextNode(slideInAnimation));
document.head.appendChild(style);

const ButtonPay = styled.button`
    border: none;
    padding: 0;
    width: 15%;
    height: 30%;
    font-family: 'Pretendard-Regular';
    font-size: 1rem;
    border-radius: 0.6rem;
    background: #D9D9D9;
`
const ListDiv = styled.div`
    width: 60%;
    height: 15%;
    background: #FFF;
    display: flex; 
    margin: 1%;
    border-radius: 0.6rem;    
`
const ListTitle = styled.p`
    width: 35%;
    heigth: 100%;
    padding: 1%;
    display:flex;
    align-items:center;
    justify-content: right;
`
const ListGap = styled.p`
    width: 20%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content: left;
    margin: 0;
`
const ListContent = styled.input`
    width: 40%;
    heigth: 100%;
    background: #FFF;

    text-align: right;
    border: none;
    font-family: 'Pretendard-Regular';
    outline: none;
`
/* eslint-disable */
function CashPopup({openCashPopup, closeCashPopup, tableId}) {
    const [cashModalOn, setCashModalOn] = useState(false);
    // 받은금액
    const [receiveAmount, setReceiveAmount] = useState(0);
    // 결제금액
    // const [paymentAmount, setPaymentAmount] = useState(15000);
    const totalPrice = useRecoilValue(TotalPrice)
    // const menu = useRecoilValue(TableState)
    // const [menu,setMenu] = getAtom(tableId)
    // 거스름돈
    const [change, setChange] = useState(0);

    const handleReceiveAmountChange =(e) =>{
        setReceiveAmount(e.target.value)
    }
    // const resetTable5 = useResetRecoilState(Table5State);

    useEffect(() => {
        // 팝업이 열릴 때마다 실행되는 코드
        // 여기에서 초기화해야 할 변수를 설정합니다.
        console.log("cashModalOn",cashModalOn)
        if(cashModalOn == true){
            setReceiveAmount(0);
            setChange(0)
        }
        else{
            handleReceiveAmountChange
        }
    }, [cashModalOn]);
    
    useEffect(() => {
        // 받은금액 변경될때마다 거스름돈 계산
        //console.log("useEffect - receiveAmount ")
        setChange(receiveAmount - totalPrice)
    },[receiveAmount]);
    const [closeAllPopup,setCloseAllPopup] = useRecoilState(PayCompleteState)
    async function payComplete(){
        // 버튼클릭 시
        // const orderItems = []
        // menu.forEach(category => {
        //     category.items.forEach(item => {
        //         const {item_id, count} = item;
        //         // // count가 0이 아닌 경우에만 배열에 추가
        //         if(item.count !== 0){
        //             orderItems.push({item_id,count})
        //         }                
        //     })
        // })
        // const data = {
        //     total_price: totalPrice,
        //     items: orderItems
        // }
        // console.log("data:",data)

        // const dataPost = OrdersPostApi(data);
        // console.log(dataPost)
        if (receiveAmount >= totalPrice){
            const data = {table_no:tableId,payment_type:"현금",total_price:totalPrice}
            const dataPost = await PayPostApi(data)
            console.log(dataPost)
            // // 1. 팝업 모두 닫힘
            setCloseAllPopup(true)
            console.log("=>cashPopup closeAllPopup",closeAllPopup)
            closeCashPopup()
        }else{
            alert("받은 금액이 결제금액보다 적습니다.")
        }
            
        // 2. 테이블 초기화
        
    }
    return (
        <>
        {/* <Button type='button' onClick={openModal}>현금</Button> */}

        <Modal isOpen={openCashPopup} onRequestClose={closeCashPopup} style={modalStyle} contentLabel="CashPopup">
            {/* <ModalContent/> */}
            <BackBt type='button' onClick={closeCashPopup}/>
                <div style={{height:'65%', width: '100%', 'justify-content': 'center', display: 'flex', flexDirection: 'column', 'align-items': 'center'}}>
                    <ListDiv>
                        <ListTitle>받은금액</ListTitle>
                        <ListContent type="number" value={receiveAmount} onInput={handleReceiveAmountChange} />
                        <ListGap>원</ListGap>
                    </ListDiv>
                    <ListDiv>
                        <ListTitle>결제금액</ListTitle>
                        <ListContent type="number" value={totalPrice} readOnly/>
                        <ListGap>원</ListGap>
                    </ListDiv>
                    <ListDiv>
                        <ListTitle>거스름돈</ListTitle>
                        <ListContent type="number" value={change} readOnly/>
                        <ListGap>원</ListGap>
                    </ListDiv>
                </div>
                <div style={{height:'20%',width: '100%', 'justify-content': 'center', display: 'flex','align-items' : 'center'}}>
                    <ButtonPay type='button' onClick={payComplete}>결제</ButtonPay>
                </div>
        </Modal>
        </>
    );
};
export default CashPopup;