import Modal from 'react-modal';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
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
    /* eslint-disable no-console */
    console.log("OrderPopup-tableId",tableId)
    // const [orderModalOn, setOrderModalOn] = useState(false); 

    // const openOrderPopup = () => {
    //     /* eslint-disable no-console */
    //     console.log(orderModalOn)

    //     setOrderModalOn(true)
    // }
    // const closeOrderPopup = () => {
    //     setOrderModalOn(false)
    // }
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

    // 팝업주소
    const location = useLocation();

    const [items,setItems] = useState(
        [{ name: '품목 1', price: 1000, count: 2 },
        { name: '품목 2', price: 2000, count: 1 },
        { name: '품목 3', price: 1500, count: 3 }])

    return(
        // {/* <input type="button" value= "orderPopup" onClick={openOrderPopup}/> */}
        <>
        <Modal isOpen={openOrderPopup} isClose={closeOrderPopup} style={modalStyle} contentLabel="orderPopup">
            {/* <ModalContent/> */}
            <div>
            <p>useLocation : {location.pathname}</p>
            {/* 왼쪽 탭 화면 */}
            <button type='button' onClick={closeOrderPopup}>테이블</button>
            </div>
            <div style={{ flex: 3, borderRight: '1px solid #ccc' }}>             
                {/* 왼쪽 탭 화면 컨텐츠 */}
                <OrderItem items = {items}/>
            </div>

            {/* 오른쪽 컴포넌트 화면 */}
            <div style={{ flex: 1.5, padding: '20px'}}>
                {/* 오른쪽 컴포넌트 화면 컨텐츠 */}
                <h2>주문 목록</h2>                
                <OrderList items ={items}/>
                {/* <PayButton type='button' value="Close" onClick={()=>closeOrderPopup}/> */}
                <Link to={`/order/${tableId}/payment`} onClick={(e) => { e.preventDefault(); openPaymentPopup(); }}>
                <PayDiv>
                    <div style={{ flex: 3, display:'flex', 'alignItems': 'center','justify-content': 'center'}}>
                        총 결제금액
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