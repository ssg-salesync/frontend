import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { StoreState } from "../recoil/atoms/StoreState";
import { StorePostApi } from "../api/auth/signup/StorePostApi";
import { StoreTokenPostApi } from "../api/auth/signup/StoreTokenPostApi";
import { TotalDiv, ComponentDiv, TitleDiv,InsertDiv } from "../styles/CommonStyle";
import { UserCheckState } from "../recoil/atoms/UserState";


/* eslint-disable */

// 컴포넌트 전체 영역
// const ComponentDiv = styled.div`
//   height: 80vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// // 매장정보 제목 영역
// const TitleDiv = styled.div`
//   height: 30%;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   // 반응형에 맞게 폰트 크기 조정
//   @media screen and (max-width: 480px) {
//     font-size: 100%;
//   }

//   @media screen and (min-width: 481px) and (max-width: 1024px) {
//     font-size: 200%;
//   }

//   @media screen and (min-width: 1025px) {
//     font-size: 300%;
//   }
// `;

// 매장명, 주소 등 입력 영역
// const InsertDiv = styled.div`
//   height: 40%;
//   width: 100%;
//   margin: 30px auto;
//   width: 400px;
//   text-align: center;
//   align-items: center;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// 매장명, 주소 등 입력칸
const InputField = styled.input`
  border: none;
  border-bottom: 2px solid #1C395E;
  margin:1.5%;
  width: 45%;
  font-family: Pretendard-Regular;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 40%;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 90%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 110%;
  }
`;
// 다음 버튼 영역
const ButtonDiv = styled.div`
height: 30%;
width: 100%;
// margin-bottom:10%;
display: flex;
align-items: center;
justify-content: center;
@media screen and (min-width: 1025px) {
  // margin-top: 20px;
  height: 30%;
}
`;
// 다음 버튼
const NextButton = styled.button`
  // width: 7.125rem;
  // height: 2.375rem;
  padding: 10px 30px;
  border-radius: 0.5625rem;
  border:none;
  background-color: #1D56A8;
  cursor: pointer;

  color: #FFF;
  font-family: 'Pretendard-Regular';
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap; // 버튼 내 줄바꿈 금지

  &:hover {
    background-color: #e0e0e0;
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 40%;
    padding: 5px 15px;
  }  
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 90%;
    padding: 8px 20px;
  }  
  @media screen and (min-width: 1025px) {
    font-size: 120%;
  }
`;

// 드롭다운 컨테이너
const DropdownContainer = styled.div`
  margin-top: 3%;
  width: 45%;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 10px;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 80%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 110%;
  }
`;

// 드롭다운 스타일
const Dropdown = styled.select`
  border: none;
  border-bottom: 2px solid #1C395E;
  width: 100%;
  height: 100%;
  font-family: Pretendard-Regular;
  font-size: 85%;

  // 선택한 옵션 스타일
  option:checked {
    background-color: #00ADEF;
    color: white;
  }

  // 드롭다운 화살표 아이콘 스타일
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%231C395E" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;

  // 반응형 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 70%;
  }
`;

// 드롭다운 옵션 스타일
const DropdownOption = styled.option`
  font-family: Pretendard-Regular;
`;


function StorePage() {

  // 회원가입 페이지에서 등록한 recoil 전역상태 데이터
  const signupData = useRecoilState(StoreState)

  // console.log('데이터 : ', signupData[0])

  // 나머지 매장 등록 데이터
  const [storeData, setStoreData] = useState({
    storeName: '',
    address: '',
    storeType: ''
  });

  // 드롭다운 용 선택한 storeType
  const [selectedStoreType, setSelectedStoreType] = useState('');

  // 드롭다운에 나올 목록들
  const storeTypes = [
    '휴게음식점',
    '일반음식점',
    '단란주점업',
    '유흥주점업',
    '위탁급식업',
    '제과점업'
  ];

  // 드롭다운에 선택한 storeType과 위의 storeType 상태 취합
  const handlerStoreTypeSelect = (e) => {
    const selectedType = e.target.value;
    setStoreData({ ...storeData, storeType: selectedType });
    setSelectedStoreType(selectedType);
  };

  // 각 필드 데이터 변경 시 해당 상태 변경
  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData({ ...storeData, [name]: value });
  };

  // 모든 데이터 합치기
  const storesData = { ...signupData[0], ...storeData };

  // 헤더용 recoil 세팅 (로그인, 로그아웃)
  const setUserCheck = useSetRecoilState(UserCheckState)

  // 네비게이트 훅
  const navigate = useNavigate();

  // console.log(storesData.storeType)
  
  // 다음 버튼 클릭 이벤트 핸들러
  const handlerNextClick = () => {
    const data = {
      username: storesData.username,
      password: storesData.password,
      owner_name: storesData.ownerName,
      phone: storesData.phone,
      store_name: storesData.storeName,
      address: storesData.address,
      store_type: storesData.storeType
    };

    // 다음 페이지 넘어가지 않는 조건 부여
    if (
      !data.store_name
    ) { alert('매장명을 입력해주세요.'); 
    return; // 다음 페이지로 넘어가지 않음
    };

    if (
      !data.address
    ) { alert('주소를 입력해주세요.'); 
    return; // 다음 페이지로 넘어가지 않음
    };

    if (
      !data.store_type
    ) { alert('업종을 선택해주세요.'); 
    return; // 다음 페이지로 넘어가지 않음
    };

    // API 호출
    StorePostApi(data)
    .then(res => {
      console.log('API 호출 성공:', res);

      // 첫 번째 API 호출이 성공한 후에 두 번째 API 호출
      const tokenData = {
        username: storesData.username,
        password: storesData.password
      };

      // 다음 페이지로 넘어감
      navigate('/signup/stores/pos');

      return StoreTokenPostApi(tokenData);
    })
    .then(tokenRes => {
      console.log('토큰 발급 성공: ', tokenRes);
      setUserCheck(true)
    })
    .catch(err => {
      console.error('API 호출 또는 토큰 발급 실패: ', err);
    });
};

  // console.log('넘어온 데이터: ', signupData[0])
  // console.log('api통신할 전체 데이터: ', storesData)

  return (
    <TotalDiv>
    <ComponentDiv>
      <TitleDiv>매장을 등록해주세요.</TitleDiv>
      <InsertDiv>
        <InputField
          type="text"
          name="storeName"
          value={storeData.storeName}
          onChange={handlerInputChange}
          placeholder="매장명"
        />
        {/* <br/> */}
        <InputField
          type="text"
          name="address"
          value={storeData.address}
          onChange={handlerInputChange}
          placeholder="주소"
        />
        {/* <br/> */}
        <DropdownContainer>
          <Dropdown
            id="storeTypeSelect"
            value={selectedStoreType}
            onChange={handlerStoreTypeSelect}
          >
            <DropdownOption value='' disabled selected hidden>업종을 선택하세요</DropdownOption>
            {storeTypes.map((type, idx) => (
              <DropdownOption key={idx} value={type}>
                {type}
              </DropdownOption>
            ))}
          </Dropdown>
        </DropdownContainer>
      </InsertDiv>
      <ButtonDiv>
          <NextButton type="submit" onClick={handlerNextClick}>다음</NextButton>
      </ButtonDiv>
    </ComponentDiv>
    </TotalDiv>
  );
};

export default StorePage