import { useState } from 'react';
import Modal from 'react-modal';
import { styled } from 'styled-components';
import OrderItem from './OrderItem';
import OrderList from './OrderList';


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

function OrderModal () {

    const [orderModalOn, setOrderModalOn] = useState(false); 

    const openModal = () => {
        /* eslint-disable no-console */
        console.log(orderModalOn)

        setOrderModalOn(true)
    }
    const closeModal = () => {
        setOrderModalOn(false)
    }

    return(
        <>
        <input type="button" value= "popup" onClick={openModal}/>

        <Modal isOpen={orderModalOn} onRequestClose={closeModal} style={modalStyle} contentLabel="Example Modal">
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
                <OrderList closeModal={closeModal}/>
                {/* <PayButton type='button' value="Close" onClick={()=>closeModal}/> */}
                <PayDiv onClick={closeModal}>
                    <div style={{ flex: 3, borderRight: '1px solid #ccc'}}>
                        총 결제금액
                    </div>
                    <div style={{ flex: 1.5}}>
                        결제하기
                    </div>
                </PayDiv>
            </div>
        </Modal>
        </>
    )
};
export default OrderModal;