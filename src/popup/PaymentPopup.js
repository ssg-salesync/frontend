import Modal from 'react-modal';
// import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import PaymentList from "../components/payment/PaymentList";
import PaymentWay from "../components/payment/PaymentWay";
import { PayCompleteState } from '../recoil/atoms/ItemState';

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
        background: 'linear-gradient(100deg, #E4F4FF 9.3%, #E0F6FF 55.65%, #D2E5FC 99.2%)',
      },
};

// 모달을 위한 루트 엘리먼트 설정
Modal.setAppElement('#root');

/* eslint-disable*/
function PaymentPopup({openPaymentPopup,closePaymentPopup,closeOrderPopup, tableId}) {
console.log("PaymentPopup open")
const closeAllPopup = useRecoilValue(PayCompleteState)
    // const [payModalOn, setPayModalOn] = useState(false); 

    // const openModal = () => {
    //     /* eslint-disable no-console */
    //     console.log(payModalOn)

    //     setPayModalOn(true)
    // }
    // const closeModal = () => {
    //     setPayModalOn(false)
    // }
    useEffect(() => {
        console.log("paymentPopup",closeAllPopup)
    },[closeAllPopup]);
    return (
        <>
        {/* <input type="button" value= "PayPopup" onClick={openModal}/> */}

        <Modal isOpen={openPaymentPopup} onRequestClose={closePaymentPopup} style={modalStyle} contentLabel="PaymentPopup">
            {/* <ModalContent/> */}
            {/* 왼쪽 탭 화면 */}
            <button type='button' onClick={closePaymentPopup} style={{width:'10%',height:'5%'}}>Back</button>
            <div style={{ flex: 3, borderRight: '1px solid #ccc' }}>             
                {/* 왼쪽 탭 화면 컨텐츠 */}
                <PaymentList closeModal={closePaymentPopup}/>
            </div>

            {/* 오른쪽 컴포넌트 화면 */}
            <div style={{ flex: 1.5, padding: '20px'}}>
                {/* 오른쪽 컴포넌트 화면 컨텐츠 */}              
                <PaymentWay closePaymentPopup={closePaymentPopup} closeOrderPopup={closeOrderPopup} tableId={tableId}/>
            </div>
        </Modal>
        </>
    );
};

export default PaymentPopup;