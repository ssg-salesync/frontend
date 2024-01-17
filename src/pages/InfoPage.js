import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { InfoPostApi } from "../api/auth/info/InfoPostApi";
import { InfoGetApi } from "../api/auth/info/InfoGetApi";
import { InfoState } from "../recoil/atoms/InfoState";
import { ComponentDiv, TotalDiv, UserDiv, EditTitleDiv, MsgDiv} from "../styles/CommonStyle";

/* eslint-disable */

// 컴포넌트 전체 영역
// const ComponentDiv = styled.div`
//   height: 80vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

const InsertDiv = styled.div`
  height: 20%;
  width: 80%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
// 아이디, 비밀번호 등 입력칸
const InputField = styled.input`
  border: none;
  border-bottom: 2px solid #1C395E;
  height: 15%;
  width:45%;
  font-size: 100%;
  font-family: Pretendard-Regular;

  // 반응형에 맞게 폰트 크기 조정
  // @media screen and (max-width: 480px) {
  //   font-size: 70%;
  // }

  // @media screen and (min-width: 481px) and (max-width: 1024px) {
  //   font-size: 85%;
  // }

  // @media screen and (min-width: 1025px) {
  //   font-size: 100%;
  // }
`;
// 다음 버튼 영역
const ButtonDiv = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// 다음 버튼
const NextButton = styled.button`
  padding: 10px 30px;

  border-radius: 0.5625rem;
  border:none;
  background-color: #1D56A8;
  cursor: pointer;

  color: #FFF;
  font-family: 'Pretendard-Regular';
  font-size: 130%;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap; // 버튼 내 줄바꿈 금지

  &:hover {
    filter: drop-shadow(0px 7px 10px rgba(29, 86, 168, 0.30));
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    font-size: 80%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 110%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 130%;
  }
`;

function InfoPage() {
  // 경고메세지
  const [msg, setMsg] =useState("")

  // 기존 비밀번호에 입력한 데이터 상태 저장
  const [infoData, setInfoData] = useState({
    password: ''
  });

  // 기존 비밀번호 필드 데이터 변경 시 해당 상태 변경
  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setInfoData({ ...infoData, [name]: value });
  };

  // 비밀번호 상태 전역 저장되게 recoil 세팅
  const [infoState, setInfoState] = useRecoilState(InfoState)

  // 네비게이트 훅
  const navigate = useNavigate();

  // POST로 기존 비밀번호 맞는지 확인 이벤트핸들러
  const handlerPasswordCheck = async () => {
    try {

      if (infoData.password.trim() === '') {
        setMsg('기존 비밀번호를 입력해주세요.')
        return;
      };

      const password = { password: infoData.password }
      const res = await InfoPostApi(password);
      console.log(res);

      // 기존 비밀번호와 일치하지 않으면 다음 페이지 못 넘어감
      if (res.data.result === 'failed') {
        setMsg('기존 비밀번호가 일치하지 않습니다.')

        // 입력칸 초기화
        setInfoData({...infoData, password: ''})

        // 입력칸에 포커스
        if (passwordRef.current) {
          passwordRef.current.focus();
        };
      } else {

        // 다음 페이지로 넘어갈 데이터 상태 저장
        setInfoState({...infoState, ...infoData})

        navigate('/mypage/info/newpassword');
      }
    } catch (err) {
      console.log(err);
    };
  };

  // 기존 비밀번호 입력칸 포커스 훅
  const passwordRef = useRef(null);

  // GET으로 가져올 아이디 저장할 상태
  const [ownerName, setOwnerName] = useState('');

  // GET으로 아이디를 가져와서 상태 저장
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerNameRes = await InfoGetApi();
        setOwnerName(ownerNameRes.owner_name)
      } catch(err) {
      console.log(err);
    };
  };
    fetchData();
  }, []);

  return (
    <TotalDiv>
    <ComponentDiv>      
      <EditTitleDiv>비밀번호 확인</EditTitleDiv>
      <UserDiv>{ownerName} 님</UserDiv>
      <InsertDiv>        
        <InputField
          type="password"
          name="password"
          value={infoData.password}
          onChange={handlerInputChange}
          placeholder="기존 비밀번호"
          ref={passwordRef}
        />
        <br/>
        <MsgDiv>{msg}</MsgDiv>
      </InsertDiv>
      <ButtonDiv>
          <NextButton onClick={handlerPasswordCheck}>다음</NextButton>
      </ButtonDiv>
    </ComponentDiv>
    </TotalDiv>
  );
};

export default InfoPage;