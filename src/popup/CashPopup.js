import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useRecoilValue, useResetRecoilState, useRecoilState } from "recoil";   // 읽기 전용
import { styled } from 'styled-components';
import { PayCompleteState, TableState, TotalPrice } from '../recoil/atoms/ItemState';
import { getAtom } from '../components/func/AtomData';
import { PayPostApi } from '../api/pay/PayPostApi';

const modalStyle ={
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // 모달의 너비
        height: '80%', // 모달의 높이
        display: 'flex',
        flexDirection: 'column',
      },
};
const Button = styled.button`
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
`
const ButtonPay = styled.button`
    border: none;
    padding: 0;
    width: 15%;
    height: 15%;
`
const ListDiv = styled.div`
    width: 60%;
    height: 15%;
    background: gray;
    display: flex; 
    margin: 1%
`
const ListTitle = styled.p`
    width: 35%;
    heigth: 100%;
    padding: 1%;
    text-align: right;
`
const ListGap = styled.p`
    width: 20%;
    height:100%;
    padding: 1%;
`
const ListContent = styled.input`
    width: 40%;
    heigth: 100%;
    background: gray;

    padding: 1%;
    text-align: right;
    border: none;
    overflow: hidden;

    :focus{
        background-color : white;
    }
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
        
        const data = {table_no:tableId,payment_type:"현금",total_price:totalPrice}
        const dataPost = await PayPostApi(data)
        console.log(dataPost)
        // // 1. 팝업 모두 닫힘
        setCloseAllPopup(true)
        console.log("=>cashPopup closeAllPopup",closeAllPopup)
        closeCashPopup()
            
        // 2. 테이블 초기화
        
    }
    return (
        <>
        {/* <Button type='button' onClick={openModal}>현금</Button> */}

        <Modal isOpen={openCashPopup} onRequestClose={closeCashPopup} style={modalStyle} contentLabel="CashPopup">
            {/* <ModalContent/> */}
            <button type='button' onClick={closeCashPopup} style={{width:'10%',height:'5%'}}>Back</button>
                <div style={{height:'60%',width: '100%', 'justify-content': 'center', display: 'flex', flexDirection: 'column', 'align-items': 'center'}}>
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
                <div style={{height:'40%',width: '100%', 'justify-content': 'center', display: 'flex','align-items' : 'center'}}>
                        <ButtonPay type='button' onClick={payComplete}>결제</ButtonPay>
                </div>
        </Modal>
        </>
    );
};
export default CashPopup;