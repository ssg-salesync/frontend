import Modal from 'react-modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { ItemState } from '../recoil/atoms/ItemState';
import OrderItem from '../components/order/OrderItem';
import OrderList from '../components/order/OrderList';
import PaymentPopup from './PaymentPopup';

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
const PayDiv = styled.div`
    width: 30%;
    height: 20%;
    position: fixed;
    bottom: 0;
    margin-bottom: 2rem;
    background-color: gray;
    
    display: flex;
    flexDirection: row;
`
// 모달을 위한 루트 엘리먼트 설정
Modal.setAppElement('#root');

function OrderPopup ({openOrderPopup,closeOrderPopup,tableId}) {
    // PaymentPopup - 결제팝업
    const [paymentPopupOn, setPaymentPopupOn] = useState(false);
    
    const openPaymentPopup =() =>{
        setPaymentPopupOn(true)
    }

    const closePaymentPopup =() =>{       
        /* eslint-disable no-console */ 
        console.log("3-closePaymentPopup함수")
        setPaymentPopupOn(false)
        closeOrderPopup()        
    }
    // setItems([
    //     { name: '커피', content1: {menu:'아메리카노',price: 3000, count : 3 }, content2: {menu:'카페라떼',price: 3500, count : 0 }},
    //     { name: '디저트', content1: {menu: '초코케이크',price: 7500, count : 4 },content2:{ menu:'생크림케이크',price : 8000, count:0 }},
    //     { name: '기타', content1: {menu: '시럽',price: 500, count : 4 }}
    // ])
    const menu = useRecoilValue(ItemState)
    
    const totalAmountCalculate = () =>{
        let totalPrice = 0;

        menu.forEach((category) => {
            category.items.forEach((item) => {
              totalPrice += item.price * item.count;
            });
          });
      
          return totalPrice;
    };

    return(
        // {/* <input type="button" value= "orderPopup" onClick={openOrderPopup}/> */}
        <>
        <Modal isOpen={openOrderPopup} isClose={closeOrderPopup} style={modalStyle} contentLabel="orderPopup">
            {/* <ModalContent/> */}
            {/* 왼쪽 탭 화면 */}
            <div style={{ flex: 3, borderRight: '1px solid #ccc' }}>             
                {/* 왼쪽 탭 화면 컨텐츠 */}
                <OrderItem/>
            </div>

            {/* 오른쪽 컴포넌트 화면 */}
            <div style={{ flex: 1.5, padding: '20px'}}>
                {/* 오른쪽 컴포넌트 화면 컨텐츠 */}
                <h2>주문 목록</h2>                
                <OrderList/>
                {/* <PayButton type='button' value="Close" onClick={()=>closeOrderPopup}/> */}
                <Link to={`/order/${tableId}/payment`} onClick={(e) => { e.preventDefault(); openPaymentPopup(); }}>
                <button type='button' onClick={closeOrderPopup}>테이블</button>
                <PayDiv>
                    <div style={{ flex: 3, display:'flex', 'alignItems': 'center','justify-content': 'center'}}>
                        <p>총 결제금액 : {totalAmountCalculate()}원</p>
                    </div>
                    <div style={{ flex: 1.5, display:'flex', 'alignItems': 'center','justify-content': 'center'}}>
                        결제하기
                    </div>
                </PayDiv>
                </Link>
            </div>
        </Modal>
        {paymentPopupOn && <PaymentPopup openPaymentPopup={openPaymentPopup} closePaymentPopup={closePaymentPopup} closeOrderPopup={closeOrderPopup} tableId={tableId}/>}
        </>
    )
};
export default OrderPopup;