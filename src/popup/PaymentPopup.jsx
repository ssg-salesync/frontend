import Modal from 'react-modal';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import PaymentList from "../components/payment/PaymentList";
import PaymentWay from "../components/payment/PaymentWay";
import { PayCompleteState } from '../recoil/atoms/ItemState';

// 애니메이션 키프레임
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
        flexDirection: 'row',
        background: 'linear-gradient(130deg, #E4F4FF, #E0F6FF, #84BDFF)',
        animation: 'slideIn 0.5s forwards', // 애니메이션 효과 적용
      },
};
const BackBt = styled(IoArrowBackSharp)`
  width:5%;
  height:5%;

  cursor: pointer;
`
// style요소에 css 애니메이션 요소를 추가
const style = document.createElement('style');
style.appendChild(document.createTextNode(slideInAnimation));
document.head.appendChild(style);

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
            <BackBt type='button' onClick={closePaymentPopup}/>
            <div style={{ width: '70%', borderRight: '1px solid #ccc' }}>             
                {/* 왼쪽 탭 화면 컨텐츠 */}
                <PaymentList closeModal={closePaymentPopup}/>
            </div>

            {/* 오른쪽 컴포넌트 화면 */}
            <div style={{ width: '30%', padding: '20px'}}>
                {/* 오른쪽 컴포넌트 화면 컨텐츠 */}              
                <PaymentWay closePaymentPopup={closePaymentPopup} closeOrderPopup={closeOrderPopup} tableId={tableId}/>
            </div>
        </Modal>
        </>
    );
};

export default PaymentPopup;