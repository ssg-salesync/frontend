import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { StoreState } from "../recoil/atoms/StoreState";
import { SignupPostApi } from "../api/auth/signup/SignupPostApi";
import { TotalDiv, ComponentDiv, TitleDiv,InsertDiv} from "../styles/CommonStyle";


/* eslint-disable */

// 다음 버튼 영역
const ButtonDiv = styled.div`
  height: 20%;
  width: 100%;
  margin-bottom:10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 아이디, 비밀번호 등 입력칸
const InputField = styled.input`
  border: none;
  border-bottom: 2px solid #1C395E;
  // margin:3%;
  width:35%;
  font-family: Pretendard-Regular;

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
  width: 7.125rem;
  height: 2.375rem;
  // margin-left: -15%;
  border-radius: 0.5625rem;
  border:none;
  background-color: #1D56A8;
  cursor: pointer;

  color: #FFF;
  font-family: 'Pretendard-Regular';
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
  &:hover {
    background-color: #e0e0e0;
  }
  // 반응형에 맞게 폰트 크기 조정
  // @media screen and (max-width: 480px) {
  //   font-size: 50%;
  // }

  // @media screen and (min-width: 481px) and (max-width: 1024px) {
  //   font-size: 100%;
  // }

  // @media screen and (min-width: 1025px) {
  //   font-size: 150%;
  // }
`;

function SignupPage() {

  // 각 필드에 입력한 데이터 상태 저장
  const [signupData, setSignupData] = useState({
    username: '',     // 아이디
    password: '',
    ownerName: '',    // 사용자이름
    phone: ''
  });

  // 비밀번호 확인용 데이터 상태 저장
  const [passwordData, setPasswordData] = useState({
    confirmPassword: ''   // 비밀번호 확인
  });

  // 각 필드 데이터 변경 시 해당 상태 변경
  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  // 비밀번호 확인 필드 데이터 변경 시 해당 상태 변경
  const handlerConfirmPassword = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };


  // 필드별 입력칸 포커스 훅
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const ownerNameRef = useRef(null);
  const phoneRef = useRef(null);
  
  const confirmPasswordRef = useRef(null);


  // 8~16자의 영문 대/소문자, 숫자 입력
  const isUsernameValid = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{8,16}$/;
    return usernameRegex.test(username);
  };

  // 10~16자의 영문 대/소문자, 숫자, 특수문자를 최소 1개씩 입력
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/;
    return passwordRegex.test(password);
  };

  // 2~20자의 한글, 영문 대/소문자 입력
  const isOwnerNameValid = (ownerName) => {
    const ownerNameRegex = /^[가-힣a-zA-Z]{2,20}$/;
    return ownerNameRegex.test(ownerName);
  };

  // 11자의 숫자 입력
  const isPhoneValid = (phone) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
  };


  // 각 필드별 조건 부여 이벤트 핸들러
  const handlerUsernameBlur = () => {

    // 경고창 무한반복 안되게 초기화
    if (signupData.username.trim() === '') {
      return;
    };

    // 필드에 입력칸 조건 부여 | 조건 미충족시 경고창 알림
    const isValid = isUsernameValid(signupData.username);
    if (!isValid) {
      alert('아이디: 8~16자의 영문 대/소문자, 숫자를 사용해 주세요.');

      // 입력칸 초기화
      setSignupData({ ...signupData, username: ''});

      // 입력칸에 포커스
      if (usernameRef.current) {
        usernameRef.current.focus();
      };
    };
  };

  // 각 필드별 조건 부여 이벤트 핸들러
  const handlerPasswordBlur = () => {

    // 경고창 무한반복 안되게 초기화
    if (signupData.password.trim() === '') {
      return;
    };

    // 필드에 입력칸 조건 부여 | 조건 미충족시 경고창 알림
    const isValid = isPasswordValid(signupData.password);
    if (!isValid) {
      alert('비밀번호: 10~16자의 영문 대/소문자, 숫자, 특수문자를 최소 1개씩 사용해 주세요.');

      // 입력칸 초기화
      setSignupData({ ...signupData, password: ''});

      // 입력칸에 포커스
      if (passwordRef.current) {
        passwordRef.current.focus();
      };
    };
  };

  // 각 필드별 조건 부여 이벤트 핸들러
  const handlerOwnerNameBlur = () => {

    // 경고창 무한반복 안되게 초기화
    if (signupData.ownerName.trim() === '') {
      return;
    };

    // 필드에 입력칸 조건 부여 | 조건 미충족시 경고창 알림
    const isValid = isOwnerNameValid(signupData.ownerName);
    if (!isValid) {
      alert('이름: 2~20자의 한글, 영문 대/소문자를 사용해 주세요.');

      // 입력칸 초기화
      setSignupData({ ...signupData, ownerName: ''});

      // 입력칸에 포커스
      if (ownerNameRef.current) {
        ownerNameRef.current.focus();
      };
    };
  };

  // 각 필드별 조건 부여 이벤트 핸들러
  const handlerPhoneBlur = () => {

    // 경고창 무한반복 안되게 초기화
    if (signupData.phone.trim() === '') {
      return;
    };

    // 필드에 입력칸 조건 부여 | 조건 미충족시 경고창 알림
    const isValid = isPhoneValid(signupData.phone);
    if (!isValid) {
      alert('전화번호: ㅡ 없이 11자의 숫자를 사용해 주세요.');

      // 입력칸 초기화
      setSignupData({ ...signupData, phone: ''});

      // 입력칸에 포커스
      if (phoneRef.current) {
        phoneRef.current.focus();
      };
    };
  };

  // 비밀번호 확인 필드 조건 부여 이벤트 핸들러
  const handlerConfirmPasswordBlur = () => {

    // 경고창 무한반복 안되게 초기화
    if (passwordData.confirmPassword.trim() === '') {
      return;
    };

    // 필드에 입력칸 조건 부여 | 조건 미충족시 경고창 알림 | 조건: 비밀번호랑 일치하는지
    if (passwordData.confirmPassword !== signupData.password) {
      alert('비밀번호가 일치하지 않습니다.');

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

  // 데이터 상태 전역 저장되게 recoil 세팅
  const [storeState, setStoreState] = useRecoilState(StoreState);

  // 네비게이트 훅
  const navigate = useNavigate();


  // 다음 버튼 클릭 이벤트핸들러 => StorePage에 username, password, ownerName, phone 데이터가 넘어감
  const handlerNextClick = async () => {

    // 모든 필드가 입력되지 않으면 다음 페이지 안 넘어가게 조건 부여
    if (
      !signupData.username ||
      !signupData.password ||
      !passwordData.confirmPassword ||
      !signupData.ownerName ||
      !signupData.phone
    ) {

      alert('모든 항목을 입력해주세요.'); 
      return; // 다음 페이지로 넘어가지 않음
    };

    // 아이디 중복되면 다음 페이지 안 넘어가게 조건 부여
    if (signupData.username) {
      try {
        const checkResult = await SignupPostApi(signupData.username);

        // api 명세에 적힌 양식으로 조건 설정
        if (checkResult.result === "failed") {

          // 이미 존재하는 아이디인 경우 경고창 알림
          alert(checkResult.message);
          return; // 다음 페이지로 넘어가지 않음
        };
      } catch(err) {
        console.error(err);
      };
    };

    // 다음 페이지로 넘어갈 데이터 상태 저장
    setStoreState({ ...storeState, ...signupData });

    // 다음 페이지로 넘어감
    navigate("/signup/stores");
  };

  console.log('넘길 데이터: ', signupData)
  console.log('비밀번호 확인 데이터: ', passwordData)

  return (
    <TotalDiv>
    <ComponentDiv>
      <TitleDiv>회원가입을 위해 아이디와 <br/>비밀번호를 입력해주세요.</TitleDiv>
      <InsertDiv>
        <InputField
          type="text"
          name="username"
          value={signupData.username}
          onChange={handlerInputChange}
          onBlur={handlerUsernameBlur}
          placeholder="아이디"
          ref={usernameRef}
        />
        <br />
        <InputField
          type="password"
          name="password"
          value={signupData.password}
          onChange={handlerInputChange}
          onBlur={handlerPasswordBlur}
          placeholder="비밀번호"
          ref={passwordRef}
        />
        <br />
        <InputField
          type="password"
          name="confirmPassword"
          onChange={handlerConfirmPassword}
          onBlur={handlerConfirmPasswordBlur}
          placeholder="비밀번호 확인"
          ref={confirmPasswordRef}
        />
        <br />
        <InputField
          type="text"
          name="ownerName"
          value={signupData.ownerName}
          onChange={handlerInputChange}
          onBlur={handlerOwnerNameBlur}
          placeholder="이름"
          ref={ownerNameRef}
        />
        <br />
        <InputField
          type="text"
          name="phone"
          value={signupData.phone}
          onChange={handlerInputChange}
          onBlur={handlerPhoneBlur}
          placeholder="전화번호"
          ref={phoneRef}
        />
        </InsertDiv>
      <ButtonDiv>
        <div>
          <NextButton type="button" onClick={handlerNextClick}>다음</NextButton>
        </div>
      </ButtonDiv>
    </ComponentDiv>
    </TotalDiv>
  );
};

export default SignupPage;