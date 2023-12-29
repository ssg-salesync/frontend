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
        background: 'linear-gradient(100deg, #E4F4FF 9.3%, #E0F6FF 55.65%, #D2E5FC 99.2%)',
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
    background: #FFF;
    width: 60%;
    height: 50%;
    display: flex;
    align-items : center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
`

function CardPopup({openCardPopup, closeCardPopup}) {
    // const [cardModalOn, setCardModalOn] = useState(false);

    // const openModal =() =>{
    //     setCardModalOn(true);
    // }

    // const closeModal = () =>{
    //     setCardModalOn(false);
    // }
    return (

        <Modal isOpen={openCardPopup} isClose={closeCardPopup} style={modalStyle} contentLabel="CardPopup">
            {/* <ModalContent/> */}
            <CardDiv style={{width: '100%', height: '100%', }}>
            <PayIngDiv>
                <div> 카드를 넣어주세요 </div>
                <div> ~결제중~ </div>
            </PayIngDiv>
            </CardDiv>
        </Modal>
    );
};

export default CardPopup;