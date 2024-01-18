import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { InfoPutApi } from "../api/auth/info/InfoPutApi";
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

// 아이디, 비밀번호 등 입력 영역
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
  margin: 3%;
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
// 완료 버튼
const SubmitButton = styled.button`
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

function InfoNpwPage() {
  // 경고메세지
  const [msg, setMsg] =useState("")


  // 비밀번호 확인에서 등록한 recoil 전역상태 데이터
  const password = useRecoilState(InfoState);

  // recoil에서 비밀번호 추출
  const passwordData = {...password[0]}

  // console.log('passwordData: ', passwordData)
  // console.log('passwordData.password: ', passwordData.password)

  // 새 비밀번호에 입력한 데이터 상태 저장
  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: ''
  });

  // 새 비밀번호 확인에 입력한 데이터 상태 저장
  const [confirmPasswordData, setConfirmPasswordData] = useState({
    confirmPassword: ''   // 비밀번호 확인
  });

  // 새 비밀번호 필드 데이터 변경 시 해당 상태 변경
  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setNewPasswordData({ ...newPasswordData, [name]: value });
  };

  // 새 비밀번호 확인 필드 데이터 변경 시 해당 상태 변경
  const handlerConfirmPassword = (e) => {
    const { name, value } = e.target;
    setConfirmPasswordData({ ...confirmPasswordData, [name]: value });
  };


  // 필드별 입력칸 포커스 훅
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);


  // 새 비밀번호 조건: 10~16자의 영문 대/소문자, 숫자, 특수문자를 최소 1개씩 입력
  const isNewPasswordValid = (newPassword) => {
    const newPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/;
    return newPasswordRegex.test(newPassword);
  };


  const navigate = useNavigate();
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
      if (err.response && err.response.status >= 500 && err.response.status < 600) {
        // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
        navigate("/500");
      }
    };
  };
    fetchData();
  }, []);

      
  // console.log('현재 입력하고 있는 패스워드: ', infoData.password)

  // GET으로 가져올 storeID 저장할 상태
  const [storeId, setStoreId] = useState('');

  // GET으로 storeID를 가져와서 상태 저장
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeIdRes = await InfoGetApi();
        setStoreId(storeIdRes.store_id)
      } catch(err) {
      console.log(err);
      if (err.response && err.response.status >= 500 && err.response.status < 600) {
        // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
        navigate("/500");
      }
    };
  };
    fetchData();
  }, []);

  // console.log('storeId: ', storeId)
  // console.log('ownerName: ', ownerName)

  // 새 비밀번호 필드 조건 부여 이벤트 핸들러
  const handlerNewPasswordBlur = () => {

    // 경고창 무한반복 안되게 초기화
    if (newPasswordData.newPassword.trim() === '') {
      return;
    };

    // 필드에 입력칸 조건 부여 | 조건 미충족시 경고창 알림
    const isValid = isNewPasswordValid(newPasswordData.newPassword);
    if (!isValid) {
      setMsg('비밀번호: 10~16자의 영문 대/소문자, 숫자, 특수문자를 최소 1개씩 사용해 주세요.');

      // 입력칸 초기화
      setNewPasswordData({ ...newPasswordData, newPassword: ''});

      // 입력칸에 포커스
      if (newPasswordRef.current) {
        newPasswordRef.current.focus();
      };
    };
  };


  // 새 비밀번호 확인 필드 조건 부여 이벤트 핸들러
  const handlerConfirmPasswordBlur = () => {

    // 경고창 무한반복 안되게 초기화
    if (confirmPasswordData.confirmPassword.trim() === '') {
      return;
    };

    // 필드에 입력칸 조건 부여 | 조건 미충족시 경고창 알림 | 조건: 비밀번호랑 일치하는지
    if (confirmPasswordData.confirmPassword !== newPasswordData.newPassword) {
      setMsg('새 비밀번호가 일치하지 않습니다.');

      // 입력칸의 상태 초기화
      setConfirmPasswordData({ ...confirmPasswordData, confirmPassword: ''});

      // 비동기적으로 처리하기 위해 타임아웃(시간: 0) 설정
      setTimeout(() => {
        if (confirmPasswordRef.current) {
          confirmPasswordRef.current.focus()

          //입력칸 초기화
          confirmPasswordRef.current.value = '';
        };
      }, 0);
    };
  };

  console.log('새 비밀번호: ', newPasswordData.newPassword)
  // console.log('새 비밀번호 확인: ', passwordData.confirmPassword)

 

  // console.log('storeId: ', storeId)
  // console.log('지금확인중1: ', newPasswordData.newPassword)
  // console.log('지금확인중2: ', confirmPasswordData.confirmPassword)

  // 완료 버튼 클릭 이벤트핸들러 => PUT으로 비밀번호 수정 완료 후 메인페이지로 라우팅
  const handlerSubmitClick = async () => {

    // 새 비밀번호가 기존 비밀번호와 같으면 경고창 및 입력칸 초기화
    if (newPasswordData.newPassword === passwordData.password) {
      setMsg('기존 비밀번호와 같습니다.');

      setNewPasswordData({ ...newPasswordData, newPassword: ''});
      setConfirmPasswordData({ ...confirmPasswordData, confirmPassword: ''});

      if (newPasswordRef.current) {
        newPasswordRef.current.focus();
      };
      return;
    }
    
    // 새 비밀번호 필드가 입력되지 않으면 다음 페이지 안 넘어가게 조건 부여
    if (!newPasswordData.newPassword) {
      setMsg('새 비밀번호를 입력해주세요.'); 
      return;
    }

    // 새 비밀번호 확인 필드가 입력되지 않으면 다음 페이지 안 넘어가게 조건 부여
    if (!confirmPasswordData.confirmPassword) {
      setMsg('새 비밀번호 확인을 입력해주세요.'); 
      return;
    }
  
    try {
      // const storeIdToUse = storeId;
      // console.log('storeIdToUse: ',storeIdToUse)
      // console.log('PUT 요청 시 storeId: ', storeId)
      const newPassword = { password: newPasswordData.newPassword}
      const res = await InfoPutApi(storeId, newPassword); // storeId와 새 비밀번호 전달
      console.log('새 비밀번호가 성공적으로 업데이트되었습니다.', res);
      
      navigate("/home");
    } catch (err) {
      console.error('새 비밀번호 업데이트에 실패했습니다.', err);
      if (err.response && err.response.status >= 500 && err.response.status < 600) {
        // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
        navigate('/500');
      }

    }
  };

// console.log('변경할 새 패스워드: ', infoData.newPassword)

  return (
    <TotalDiv>
    <ComponentDiv>
      <EditTitleDiv>비밀번호 변경</EditTitleDiv>
      <UserDiv>{ownerName} 님</UserDiv>
      <InsertDiv>
        <InputField
          type="password"
          name="newPassword"
          value={newPasswordData.newPassword}
          onChange={handlerInputChange}
          onBlur={handlerNewPasswordBlur}
          placeholder="새 비밀번호"
          ref={newPasswordRef}
        />
        <InputField
          type="password"
          name="confirmPassword"
          value={confirmPasswordData.confirmPassword}
          onChange={handlerConfirmPassword}
          onBlur={handlerConfirmPasswordBlur}
          placeholder="새 비밀번호 확인"
          ref={confirmPasswordRef}
        />
        <br/>
        <MsgDiv>{msg}</MsgDiv>
        </InsertDiv>
      <ButtonDiv>
          <SubmitButton onClick={handlerSubmitClick}>완료</SubmitButton>
      </ButtonDiv>
    </ComponentDiv>
    </TotalDiv>
  );
};

export default InfoNpwPage;