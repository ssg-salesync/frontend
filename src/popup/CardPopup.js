import { useEffect, useState } from 'react';
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
const CardDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items : center;
    flex-direction: column;
    width: 100%;
    height: '100%';
`
const PayIngDiv = styled.div`
    // background: #fff;
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
  width: 100px;
  height: 100px;
  margin-bottom: 3%;
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
    width: 60px;
    height: 60px;
  }
  @media screen and (min-width: 1025px) {
    width: 90px;
    height: 90px;
  }
`;

const CardImgDiv = styled.div`
  width: 530px;
  height: 350px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    109.6deg,
    rgba(62, 161, 219, 1) 11.2%,
    rgba(93, 52, 236, 1) 100.2%
  );
`
const Card = styled.div`
  width: 528px;
  height: 348px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  z-index: 1;
  overflow: hidden;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`
const VisaLogo = styled.div`
  width: 20%;
  height: 20%;
  float: right;
  padding: 10px;
`
const VisaLogoImg = styled.img`
  width: 100%;
  height: 100%;
`
const VisaInfo = styled.div`
  padding: 5%;
  margin-top: 3%;
`
const VisaInfoImg = styled.img`
  width: 15%;
  height: 10%;
`
const VisaInfoP = styled.p`
  font-size: 130%;
  padding: 2% 0;
  letter-spacing: 2px;
  color: #ffffff;
`
const VisaCrinfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 4%;
  color: #ffffff;
`
const CardFont = styled.div`
  font-size: 150%;
  margin: 5%;
`
function CardPopup({openCardPopup, closeCardPopup}) {
    const [changeCard, setChangeCard] = useState(false)
    useEffect(()=>{
      setTimeout(()=>{
        setChangeCard(true)
      },2000)
    },[])
    return (
        <Modal isOpen={openCardPopup} isClose={closeCardPopup} style={modalStyle} contentLabel="CardPopup">
            {/* <ModalContent/> */}
            <CardDiv style={{width: '100%', height: '100%', }}>
              {changeCard ? 
                <PayIngDiv>
                    <Spinner />
                    <div> ~결제중~ </div>
                </PayIngDiv>
                : <><CardImgDiv>
                  <Card>
                      <VisaLogo>
                          <VisaLogoImg src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt="VisaLogoImg"/>
                      </VisaLogo>
                      <VisaInfo>
                          <VisaInfoImg src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt="VisaInfoImg"/>
                          <VisaInfoP>4586 7985 9271 6388</VisaInfoP>
                      </VisaInfo>
                      <VisaCrinfo>
                          <p>02/12</p>
                          <p>Nikhil Bobade</p>
                      </VisaCrinfo>
                  </Card>
                </CardImgDiv>
                <CardFont> 카드를 넣어주세요</CardFont></>
              }
            </CardDiv>
        </Modal>
    );
};

export default CardPopup;