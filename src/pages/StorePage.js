import { Link } from "react-router-dom"
import styled from 'styled-components';
import { useState } from "react";
import { useRecoilState } from 'recoil';
import { StoreState } from "../recoil/atoms/StoreState";
import { StorePostApi } from "../api/auth/StorePostApi";
import { StoreTokenPostApi } from "../api/auth/StoreTokenPostApi";

/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 매장정보 제목 영역
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

// 매장명, 주소 등 입력 영역
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

// 매장명, 주소 등 입력칸
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

  // 각 필드 데이터 변경 시 해당 상태 변경
  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData({ ...storeData, [name]: value });
  };

  // 모든 데이터 합치기
  const storesData = { ...signupData[0], ...storeData };

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

    // API 호출
    StorePostApi(data)
    .then(res => {
      console.log('API 호출 성공:', res);

      // 첫 번째 API 호출이 성공한 후에 두 번째 API 호출
      const tokenData = {
        username: storesData.username,
        password: storesData.password
      };

      // StoreTokenPostApi 호출을 반환하여 다음 .then 블록에서 처리
      return StoreTokenPostApi(tokenData);
    })
    .then(tokenRes => {
      console.log('토큰 발급 성공: ', tokenRes);
    })
    .catch(err => {
      console.error('API 호출 또는 토큰 발급 실패: ', err);
    });
};

  console.log('넘어온 데이터: ', signupData[0])
  console.log('api통신할 전체 데이터: ', storesData)

  return (
    <ComponentDiv>
      <TitleDiv>매장 등록</TitleDiv>
      <InsertDiv>
        <InputField
          type="text"
          name="storeName"
          value={storeData.storeName}
          onChange={handlerInputChange}
          placeholder="매장명"
        />
        <br/>
        <InputField
          type="text"
          name="address"
          value={storeData.address}
          onChange={handlerInputChange}
          placeholder="주소"
        />
        <br/>
        <InputField
          type="text"
          name="storeType"
          value={storeData.storeType}
          onChange={handlerInputChange}
          placeholder="업종"
        />
        <br/>
      </InsertDiv>
      <ButtonDiv>
        <Link to="/signup/stores/pos">
          <NextButton type="submit" onClick={handlerNextClick}>다음</NextButton>
        </Link>
      </ButtonDiv>
    </ComponentDiv>
  );
};

export default StorePage