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
const CardDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items : center;
    width: '100%';
    height: '100%';
`
const PayIngDiv = styled.div`
    background: gray;
    width: 60%;
    height: 50%;
    display: flex;
    align-items : center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
`

function CardPopup() {
    const [cardModalOn, setCardModalOn] = useState(false);

    const openModal =() =>{
        setCardModalOn(true);
    }

    const closeModal = () =>{
        setCardModalOn(false);
    }
    return (
        <>
        {/* <input type="button" value= "cardPopup" onClick={openModal}/> */}
        <Button type='button' onClick={openModal}>카드</Button>
        <Modal isOpen={cardModalOn} onRequestClose={closeModal} style={modalStyle} contentLabel="Example Modal">
            {/* <ModalContent/> */}
            <CardDiv style={{width: '100%', height: '100%', }}>
            <PayIngDiv>
                <div> 카드를 넣어주세요 </div>
                <div> ~결제중~ </div>
            </PayIngDiv>
            </CardDiv>
        </Modal>
        </>
    );
};

export default CardPopup;