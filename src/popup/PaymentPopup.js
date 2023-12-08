import Modal from 'react-modal';
import { useState } from 'react';
// import { styled } from 'styled-components';
import PaymentList from "../components/payment/PaymentList";
import PaymentWay from "../components/payment/PaymentWay";

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
        flexDirection: 'row',
      },
};

// 모달을 위한 루트 엘리먼트 설정
Modal.setAppElement('#root');

function PaymentPopup() {

    const [payModalOn, setPayModalOn] = useState(false); 

    const openModal = () => {
        /* eslint-disable no-console */
        console.log(payModalOn)

        setPayModalOn(true)
    }
    const closeModal = () => {
        setPayModalOn(false)
    }

    return (
        <>
        <input type="button" value= "PayPopup" onClick={openModal}/>

        <Modal isOpen={payModalOn} onRequestClose={closeModal} style={modalStyle} contentLabel="Example Modal">
            {/* <ModalContent/> */}
            {/* 왼쪽 탭 화면 */}
            <div style={{ flex: 3, borderRight: '1px solid #ccc' }}>             
                {/* 왼쪽 탭 화면 컨텐츠 */}
                <PaymentList closeModal={closeModal}/>
            </div>

            {/* 오른쪽 컴포넌트 화면 */}
            <div style={{ flex: 1.5, padding: '20px'}}>
                {/* 오른쪽 컴포넌트 화면 컨텐츠 */}              
                <PaymentWay closeModal={closeModal}/>
            </div>
        </Modal>
        </>
    );
};

export default PaymentPopup;