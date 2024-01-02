import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import { useEffect, useRef, useState } from "react";
import { InfoPutApi } from "../api/auth/info/InfoPutApi";
import { InfoGetApi } from "../api/auth/info/InfoGetApi";

/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 회원가입 제목 영역
const TitleDiv = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 100%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 200%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 300%;
  }
`;

// 아이디, 비밀번호 등 입력 영역
const InsertDiv = styled.div`
  height: 40%;
  width: 100%;
  margin: 30px auto;
  width: 400px;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// 다음 버튼 영역
const ButtonDiv = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 아이디, 비밀번호 등 입력칸
const InputField = styled.input`
  border: none;
  border-bottom: 2px solid #289AFF;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 70%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 85%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 100%;
  }
`;

// 다음 버튼
const NextButton = styled.button`
  width: 170%;
  height: 25%;
  margin-left: -35%;
  border-radius: 15%;
  border-color: #289AFF;
  background-color: #289AFF;
  color: white;
  cursor: pointer;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 50%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 100%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 150%;
  }
`;

function InfoPage() {

  // 새 비밀번호에 입력한 데이터 상태 저장
  const [infoData, setInfoData] = useState({
    newPassword: ''
  });

  // 새 비밀번호 확인에 입력한 데이터 상태 저장
  const [passwordData, setPasswordData] = useState({
    confirmPassword: ''   // 비밀번호 확인
  });

  // 새 비밀번호 필드 데이터 변경 시 해당 상태 변경
  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setInfoData({ ...infoData, [name]: value });
  };

  // 새 비밀번호 확인 필드 데이터 변경 시 해당 상태 변경
  const handlerConfirmPassword = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };


  // 필드별 입력칸 포커스 훅
  const passwordRef = useRef(null);
  
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);


  // 새 비밀번호 조건: 10~16자의 영문 대/소문자, 숫자, 특수문자를 최소 1개씩 입력
  const isNewPasswordValid = (newPassword) => {
    const newPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/;
    return newPasswordRegex.test(newPassword);
  };


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

      
  // console.log('현재 입력하고 있는 패스워드: ', infoData.password)



  // 여기부터 미구현 | 백엔드 API 추가 필요///////////////////////////////

  // GET으로 가져올 비밀번호 저장할 상태
  const [password, setPassword] = useState('');

  // GET으로 비밀번호를 가져와서 상태 저장
  useEffect(() => {
    const fetchData = async () => {
      try {
        const passwordRes = await InfoGetApi();
        setPassword(passwordRes.password) 
        
      } catch(err) {
      console.log(err);
    };
  };
    fetchData();
  }, []);

  // console.log('가져온 기존 비밀번호: ', password)

///////////////////////////////////////////////////////////





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
    };
  };
    fetchData();
  }, []);

  // console.log('storeId: ', storeId)
  // console.log('ownerName: ', ownerName)




  // 미완성/////////////////////////////////////////////

  // 기존 비밀번호 필드 조건 부여 이벤트 핸들러
  const handlerPasswordBlur = () => {

    // 경고창 무한반복 안되게 초기화
    if (infoData.newPassword.trim() === '') {
      return;
    };
  // 기존 비밀번호와 GET으로 가져온 비밀번호 데이터 비교
  if (infoData.newPassword !== password) {
    alert('기존 비밀번호가 일치하지 않습니다.');

    // 입력칸 초기화
    setInfoData({ ...infoData, password: '' });

    // 입력칸에 포커스
    if (passwordRef.current) {
      passwordRef.current.focus();
    };
  };
  };
//////////////////////////////////////////////////



  // 새 비밀번호 필드 조건 부여 이벤트 핸들러
  const handlerNewPasswordBlur = () => {

    // 경고창 무한반복 안되게 초기화
    if (infoData.newPassword.trim() === '') {
      return;
    };

    // 필드에 입력칸 조건 부여 | 조건 미충족시 경고창 알림
    const isValid = isNewPasswordValid(infoData.newPassword);
    if (!isValid) {
      alert('비밀번호: 10~16자의 영문 대/소문자, 숫자, 특수문자를 최소 1개씩 사용해 주세요.');

      // 입력칸 초기화
      setInfoData({ ...infoData, newPassword: ''});

      // 입력칸에 포커스
      if (newPasswordRef.current) {
        newPasswordRef.current.focus();
      };
    };
  };

 
  // 새 비밀번호 확인 필드 조건 부여 이벤트 핸들러
  const handlerConfirmPasswordBlur = () => {

    // 경고창 무한반복 안되게 초기화
    if (passwordData.confirmPassword.trim() === '') {
      return;
    };

    // 필드에 입력칸 조건 부여 | 조건 미충족시 경고창 알림 | 조건: 비밀번호랑 일치하는지
    if (passwordData.confirmPassword !== infoData.newPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');

      // 입력칸의 상태 초기화
      setPasswordData({ ...passwordData, confirmPassword: ''});

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

  // console.log('새 비밀번호: ', infoData.newPassword)
  // console.log('새 비밀번호 확인: ', passwordData.confirmPassword)

  // 네비게이트 훅
  const navigate = useNavigate();

  // console.log('storeId: ', storeId)


  // 완료 버튼 클릭 이벤트핸들러 => PUT으로 비밀번호 수정 완료 후 메인페이지로 라우팅
  const handlerSubmitClick = async () => {

    // 새 비밀번호 필드가 입력되지 않으면 다음 페이지 안 넘어가게 조건 부여
    if (!infoData.newPassword) {
      alert('새 비밀번호를 입력해주세요.'); 
      return;
    }

    // 새 비밀번호 확인 필드가 입력되지 않으면 다음 페이지 안 넘어가게 조건 부여
    if (!passwordData.confirmPassword) {
      alert('새 비밀번호 확인을 입력해주세요.'); 
      return;
    }
  
    try {
      // const storeIdToUse = storeId;
      // console.log('storeIdToUse: ',storeIdToUse)
      console.log('PUT 요청 시 storeId: ', storeId)
      const newPassword = { password: infoData.newPassword}
      const response = await InfoPutApi(storeId, newPassword); // storeId와 새 비밀번호 전달
      console.log('새 비밀번호가 성공적으로 업데이트되었습니다.', response);
      
      // 성공적으로 업데이트되었을 때, 다음 페이지로 이동하거나 다른 작업을 수행할 수 있습니다.
      navigate("/");
    } catch (error) {
      console.error('새 비밀번호 업데이트에 실패했습니다.', error);
      // 실패했을 때 사용자에게 적절한 오류 처리를 해줄 수 있습니다.
    }
  };

// console.log('변경할 새 패스워드: ', infoData.newPassword)

  return (
    <ComponentDiv>
      <TitleDiv>정보수정</TitleDiv>
      <InsertDiv>
        <h1>{ownerName} 님</h1>
        <br/>
        <InputField
          type="password"
          name="password"
          value={infoData.password}
          onChange={handlerInputChange}
          onBlur={handlerPasswordBlur}
          placeholder="기존 비밀번호"
          ref={passwordRef}
        />
        <br/>
        <InputField
          type="password"
          name="newPassword"
          value={infoData.newPassword}
          onChange={handlerInputChange}
          onBlur={handlerNewPasswordBlur}
          placeholder="새 비밀번호"
          ref={newPasswordRef}
        />
        <br/>
        <InputField
          type="password"
          name="confirmPassword"
          onChange={handlerConfirmPassword}
          onBlur={handlerConfirmPasswordBlur}
          placeholder="새 비밀번호 확인"
          ref={confirmPasswordRef}
        />
        <br/>
        </InsertDiv>
      <ButtonDiv>
        <div>
          <NextButton type="button" onClick={handlerSubmitClick}>완료</NextButton>
        </div>
      </ButtonDiv>
    </ComponentDiv>
  );
};

export default InfoPage;