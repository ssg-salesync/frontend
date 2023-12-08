import { useState } from 'react';
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
        flexDirection: 'row',
      },
};
const Button = styled.button`
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
`
function CashPopup() {
    const [cashModalOn, setCashModalOn] = useState(false);

    const openModal =() =>{
        setCashModalOn(true);
    }

    const closeModal = () =>{
        setCashModalOn(false);
    }
    return (
        <>
        <Button type='button' onClick={openModal}>현금</Button>
        <Modal isOpen={cashModalOn} onRequestClose={closeModal} style={modalStyle} contentLabel="Example Modal">
            {/* <ModalContent/> */}
            <p>현금</p>
        </Modal>
        </>
    );
};

export default CashPopup;