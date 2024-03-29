import Modal from 'react-modal';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import { styled } from 'styled-components';
import { DNA } from 'react-loader-spinner'
// import { ReqIdGetApi } from '../api/dashboard/consulting/ReqIdGetApi';
// import { WaitGetApi } from '../api/dashboard/consulting/WaitGetApi';
// import { ConsultingGetApi } from '../api/dashboard/consulting/ConsultingGetApi';

// 테스트용 api
import { ReqIdTestGetApi } from '../api/dashboard/consulting/test/ReqIdTestGetApi';
import { WaitTestGetApi } from '../api/dashboard/consulting/test/WaitTestGetApi';
import { ConsultingTestGetApi } from '../api/dashboard/consulting/test/ConsultingTestGetApi';

const TotalDiv = styled.div`
  width: 100%;
  height: 98%;
  overflow: hidden;
  margin: 0%;
  margin-top: 1%;
`
const TitleDiv = styled.div`
  width: 100%;
  margin-left: 3%;
  margin-bottom: 3%;
  display: flex;
  flex-direction: row;
`
const LeftDiv = styled.div`
  width: 90%;
`
const Title = styled.h1`
  margin: 0;
  cursor: default;
`
const ConsultCompleteDiv = styled.div`
  width: 100%;
  height: 88%;
  // display: flex;
  // justify-content: center;
  background: #fff;
  border-radius: 0.5rem;
  overflow-y: auto;
`
const ResDiv = styled.div`
  font-size: 120%;
  white-space: pre-line;
  padding: 2%;
`
const ConsultBtDiv = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const ConsultBt = styled.button`
    border: none;
    border-radius: 0.5rem;
    background: #1C395E;
    color: #FFF;
    // width: 15%;
    // height: 60%;
    padding: 10px 18px;
    font-family: Pretendard-Regular;
    font-size: 100%;
    margin-top: 1%;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        filter: drop-shadow(0px 7px 10px rgba(29, 86, 168, 0.30));
    }

    // 반응형에 맞게 폰트 크기 조정
    @media screen and (max-width: 750px) {
      font-size: 70%;
    }
    @media screen and (min-width: 750px) and (max-width: 1024px) {
      font-size: 80%;
    }
    @media screen and (min-width: 1025px) {
      font-size: 120%;
    }
`
// const typingAnimation = keyframes`
//   from {
//     width: 0;
//   }
//   to {
//     width: 100%;
//   }
// `;

// const TypingText = styled.p`
//   overflow: hidden;
//   white-space: pre-line;
//   animation: ${typingAnimation} 4s linear;
// `;

// const TypingText = styled.p`
//   overflow: hidden;
//   white-space: pre-line;
//   animation: typing 5s steps(31) infinite;

  

//   @keyframes typing {
//     0% {
//       width: 0%;
//     }
   
//     100% {
//       width: 100%;
//     }
//   }
// `;
const CloseBt = styled(IoCloseSharp)`
    // background: url("/img/Close.png"), #FFF 90%/ contain no-repeat;
    background-size: cover;
    cursor: pointer;
    width: 5%;
    height: 5%;
    border: none;
    position: fixed;
    right :3%;
`
const SpinnerDiv = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
// 로고 이미지
const LogoImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 2%;
  // transform: translate(-5%, -4%);
  // animation: fadeIn 1s forwards;
`
const ResultDiv = styled.div`
  font-size: 180%;
  margin-top:3%;
`

/* eslint-disable */
function ConsultingPage({openConsult,closeConsult,date}) {
  const navigate = useNavigate();

  // date로 GPT 시작용 request ID 상태 저장
  const [reqId, setReqId] = useState();

  // request ID로 기다리는 동안 메세지(success 시 컨설팅 가능) 상태 저장
  const [result, setResult] = useState();

  console.log('result',result)

  // 컨설팅 완료 시 해당 내용 상태 저장
  const [consulting, setConsulting] = useState();

  // date로 GPT 시작용 request ID 받아옴 - [GET]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqIdRes = await ReqIdTestGetApi(date);
        console.log('reqIdRes :', reqIdRes)
        setReqId(reqIdRes.req_id);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status >= 500 && err.response.status < 600) {
          // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
          navigate("/500");
        }
      }
    };
    fetchData();
    return;
  }, []);

  // interval(타이머 시간 당 반복)을 돌릴 때, 일반 변수로 하면 렌더링 사이클에 유지되지 않음
  // 리렌더링시마다 초기화되서 날라감
  // 생명 주기와 무관하게 success 날라올 때까지 반복하고 싶으면 useRef 이용
  const intervalRef = useRef(null);

  const handlerConsultingStart = async () => {
    try {

      // 최초 클릭 시에는 즉시 결과를 받아오도록 설정 (맨 밑에 JSX를 위해 초기 not completed 받아오기 위함)
      console.log("reqId",reqId)
      const waitRes = await WaitTestGetApi(reqId);
      console.log("waitRes",waitRes)
      const newResult = waitRes.result;
      setResult(newResult);

      // success가 날아오면 컨설팅 요청보내고 타이머 종료 - [GET]
      if (newResult === 'success') {
        clearInterval(intervalRef.current);
        const consultingRes = await ConsultingTestGetApi(reqId);
        const consulting = consultingRes.consulting;
        setConsulting(consulting);
      } else {

        // 즉시 받아온 결과가 'not completed'일 경우 5초마다 갱신하는 타이머 설정 (맨 밑에 JSX를 위해 초기 not completed 받아오기 위함)
        intervalRef.current = setInterval(async () => {
          const waitRes = await WaitTestGetApi(reqId);
          const updatedResult = waitRes.result;
          setResult(updatedResult);

          // success가 날아오면 컨설팅 요청보내고 타이머 종료 - [GET]
          if (updatedResult === 'success') {
            clearInterval(intervalRef.current);
            const consultingRes = await ConsultingTestGetApi(reqId);
            const consulting = consultingRes.consulting;
            setConsulting(consulting);
          }
        }, 5000);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status >= 500 && err.response.status < 600) {
        // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
        navigate("/500");
      }
    }
  };

  // console.log('진짜 컨설팅 ------ : ', consulting)

  const [modalStyle, setModalStyle] = useState({
    content: {
      top: '8%',
      bottom: 'auto',
      left: '9%',
      right: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%', 
      height: '80%', 
      display: 'flex',
      flexDirection: 'row',
      background: 'linear-gradient(130deg, #E4F4FF, #E0F6FF, #84BDFF)',
      animation: 'slideUp 0.5s forwards', // 기존 애니메이션 유지
      cursor: 'default'
    },
  });

  const [blogTitle, setBlogTitle] = useState('');
  const [count, setCount] = useState(-1);
  
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setBlogTitle((prevTitleValue) => {
        if (consulting && consulting.length > 0) {
          let newCount = (count + 1) % consulting.length;
          // let result = prevTitleValue ? prevTitleValue + consulting[newCount] : consulting[0]
          let result = prevTitleValue + consulting[newCount];
          // console.log("result",result)
  
          if (newCount === consulting.length - 1) {
            clearInterval(typingInterval);
          } else {
            setCount(newCount);
          }
  
          return result;
        } else {
          return prevTitleValue;
        }
      });
    }, 20);
  
    return () => {
      clearInterval(typingInterval);
    };
  }, [consulting, count]);


  return (
    <Modal isOpen={openConsult} isClose={closeConsult} style={modalStyle} contentLabel="consult">
    <TotalDiv>
      <TitleDiv>
        <LeftDiv>
          <Title>AI 컨설팅</Title>
        </LeftDiv>
        <CloseBt type='button' onClick={closeConsult}/>
      </TitleDiv>
      
      {!reqId ? (
          <>
          </>
      ) : result === 'success' ? (
          <><ConsultCompleteDiv>
              {/* <p>컨설팅이 성공적으로 완료되었습니다.</p> */}

              {/* <ResDiv>{consulting}</ResDiv> */}
              <ResDiv typedText={blogTitle} typedWidth={count * 20}>
                {/* {consulting && consulting[0]} */}
              {blogTitle}</ResDiv>

              {/* {consulting && Array.from(consulting).map((char, index) => (
              <FadeInItemDiv key={index} index={index}>
                {char}
              </FadeInItemDiv>
              ))} */}
              {/* {Array.from(consulting).map((char, index) => (
                <FadeInItemDiv key={index} index={index}>
                  {char}
                </FadeInItemDiv>
            ))} */}
            </ConsultCompleteDiv>
              {/* <ConsultCompleteDiv>
              <ConsultBt onClick={handlerConsultingStart} disabled>
                  컨설팅 완료
              </ConsultBt>
              </ConsultCompleteDiv> */}
          </>
      ) : result === 'not completed' ? (
          <>          
              <SpinnerDiv>
                {/* <Spinner/> */}
                <DNA
                  visible={true}
                  height="120px"
                  width="250px"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
                <ResultDiv>
                  컨설팅 결과를 기다리는 중입니다.
                </ResultDiv>
              </SpinnerDiv>
          </>
      ) : (
          <>
              {/* <p>컨설팅 시작 버튼을 눌러주세요</p> */}
            <ConsultBtDiv>
              <LogoImg src="/img/gptLogo.png" alt="logo"/>
              <ConsultBt onClick={handlerConsultingStart}>AI 컨설팅 받기</ConsultBt>
            </ConsultBtDiv>
          </>
      )}
    </TotalDiv>
    </Modal>
  );
};

export default ConsultingPage;