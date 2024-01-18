import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled, keyframes } from 'styled-components';
import { ReqIdGetApi } from '../api/dashboard/consulting/ReqIdGetApi';
import { WaitGetApi } from '../api/dashboard/consulting/WaitGetApi';
import { ConsultingGetApi } from '../api/dashboard/consulting/ConsultingGetApi';

// 테스트용 api
// import { ReqIdTestGetApi } from '../api/dashboard/consulting/test/ReqIdTestGetApi';
// import { WaitTestGetApi } from '../api/dashboard/consulting/test/WaitTestGetApi';
// import { ConsultingTestGetApi } from '../api/dashboard/consulting/test/ConsultingTestGetApi';


const TypedOut = styled.div`
overflow: hidden;
border-right: .15em solid orange;
font-size: 20px;
width: 0;
white-space: pre-line;
animation: typing 1s steps(20, end) forwards, blink .8s infinite;

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

// 타이핑 노란색 커서
@keyframes blink {
  from { border-color: transparent }
  to { border-color: orange; }
}
`;

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

/* eslint-disable */

function ConsultingPage() {

  // 대시보드 페이지에서 컨설팅페이지 넘어오는 버튼 클릭하면서 넘기는 props
  // (하위 컴포넌트가 아니기 때문에 uselocation에 저장된 state 가져옴)
  const location = useLocation();
  const date = location.state.date;

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
        const reqIdRes = await ReqIdGetApi(date);
        const reqId = reqIdRes.req_id;
        // console.log('reqId :', reqId)
        setReqId(reqId);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    return;
  }, [date]);

// interval(타이머 시간 당 반복)을 돌릴 때, 일반 변수로 하면 렌더링 사이클에 유지되지 않음
// 리렌더링시마다 초기화되서 날라감
// 생명 주기와 무관하게 success 날라올 때까지 반복하고 싶으면 useRef 이용
const intervalRef = useRef(null);

const handlerConsultingStart = async () => {
  try {

    // 최초 클릭 시에는 즉시 결과를 받아오도록 설정 (맨 밑에 JSX를 위해 초기 not completed 받아오기 위함)
    const waitRes = await WaitGetApi(reqId);
    const newResult = waitRes.result;
    setResult(newResult);

    // success가 날아오면 컨설팅 요청보내고 타이머 종료 - [GET]
    if (newResult === 'success') {
      clearInterval(intervalRef.current);
      const consultingRes = await ConsultingGetApi(reqId);
      const consulting = consultingRes.consulting;
      setConsulting(consulting);
    } else {

      // 즉시 받아온 결과가 'not completed'일 경우 5초마다 갱신하는 타이머 설정 (맨 밑에 JSX를 위해 초기 not completed 받아오기 위함)
      intervalRef.current = setInterval(async () => {
        const waitRes = await WaitGetApi(reqId);
        const updatedResult = waitRes.result;
        setResult(updatedResult);

        // success가 날아오면 컨설팅 요청보내고 타이머 종료 - [GET]
        if (updatedResult === 'success') {
          clearInterval(intervalRef.current);
          const consultingRes = await ConsultingGetApi(reqId);
          const consulting = consultingRes.consulting;
          setConsulting(consulting);
        }
      }, 5000);
    }
  } catch (err) {
    console.log(err);
  }
};

// console.log('진짜 컨설팅 ------ : ', consulting)


  return (
    <div>
      <h1>컨설팅</h1>
      {!reqId ? (
          <>
              <p>잠시만 기다려주세요</p>
              <button onClick={handlerConsultingStart} disabled>
                  컨설팅 대기중
              </button>
          </>
      ) : result === 'success' ? (
          <>
              <p>컨설팅이 성공적으로 완료되었습니다.</p>
              <TypedOut>{consulting}</TypedOut>
              <button onClick={handlerConsultingStart} disabled>
                  컨설팅 완료
              </button>
          </>
      ) : result === 'not completed' ? (
          <>
              <Spinner/>
              <button onClick={handlerConsultingStart} disabled>
                  컨설팅 중
              </button>
          </>
      ) : (
          <>
              <p>컨설팅 시작 버튼을 눌러주세요</p>
              <button onClick={handlerConsultingStart}>컨설팅 시작</button>
          </>
      )}
    </div>
  );
};

export default ConsultingPage;