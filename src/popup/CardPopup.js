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
        background: 'linear-gradient(130deg, #E4F4FF, #E0F6FF, #84BDFF)',
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
    width: 100%;
    height: '100%';
`
const PayIngDiv = styled.div`
    background: #fff;
    width: 60%;
    height: 50%;

    display: flex;
    align-items : center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    border-radius: 0.6rem;
    font-size: 180%;
    font-weight: 800;
    gap: 5%;
    // 반응형에 맞게 폰트 크기 조정
    @media screen and (max-width: 768px) {
      font-size: 130%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 150%;
    }
    @media screen and (min-width: 1025px) {
      font-size: 180%;
    }
`
const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left: 8px solid #000;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-top: 3%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  // 반응형
  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 50px;
    height: 50px;
  }
  @media screen and (min-width: 1025px) {
    width: 60px;
    height: 60px;
  }
`;

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
                <Spinner />
            </PayIngDiv>
            </CardDiv>
        </Modal>
    );
};

export default CardPopup;