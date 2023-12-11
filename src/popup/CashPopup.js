import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { styled } from 'styled-components';

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
`
    /* eslint-disable */
function CashPopup() {
    const [cashModalOn, setCashModalOn] = useState(false);
    // 받은금액
    const [receiveAmount, setReceiveAmount] = useState(0);
    // 결제금액
    const [paymentAmount, setPaymentAmount] = useState(15000);
    // 거스름돈
    const [change, setChange] = useState(0);

    const openModal =() =>{
        setCashModalOn(true);
    }

    const closeModal = () =>{
        setCashModalOn(false);
    }

    const handleReceiveAmountChange =(e) =>{
        setReceiveAmount(e.target.value)
    }

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
        console.log("useEffect - receiveAmount ")
        setChange(receiveAmount - paymentAmount)
    },[receiveAmount]);

    const payComplete =() =>{
        // 버튼클릭 시
        // 1. 팝업 모두 닫힘
        
            
        // 2. 테이블 초기화 
    }
    return (
        <>
        <Button type='button' onClick={openModal}>현금</Button>

        <Modal isOpen={cashModalOn} onRequestClose={closeModal} style={modalStyle} contentLabel="Example Modal">
            {/* <ModalContent/> */}
                <div style={{height:'60%',width: '100%', 'justify-content': 'center', display: 'flex', flexDirection: 'column', 'align-items': 'center'}}>
                    <ListDiv>
                        <ListTitle>받은금액</ListTitle>
                        <ListContent type="number" value={receiveAmount} onInput={handleReceiveAmountChange} />
                        <ListGap>원</ListGap>
                    </ListDiv>
                    <ListDiv>
                        <ListTitle>결제금액</ListTitle>
                        <ListContent type="number" value={paymentAmount} readOnly/>
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