import { Link } from "react-router-dom"
import styled from 'styled-components';
import { useState } from "react";
import { useRecoilState } from 'recoil';
import { StoreState } from "../recoil/atoms/StoreState";
import { StorePostApi } from "../api/Auth/StorePostApi";

/* eslint-disable */

// 매장정보 영역
const StoreDiv = styled.div`
width: 95%;
max-width: 600px;
height: auto;
margin: 4rem auto 0;
overflow: hidden;
background-color: white;
padding: 40px;
border-radius: 20px;
`;

// 매장정보 영역 제목
const StoreDivTitle = styled.div`
height: 12rem;
font-size: 1.8rem;
font-weight: lighter;
display: flex;
align-items: center;
justify-content: center;
`;

// 매장명, 주소 등 입력 영역
const InsertDiv = styled.div`
margin: 30px auto;
width: 400px;
text-align: center;
`;

// 매장명, 주소 등 입력칸
const InputField = styled.input`
  border: none;
  border-bottom: 2px solid #289AFF;
`;

// 다음 버튼
const NextButton = styled.button`
  margin-top: 5px;
  width: 100px;
  height: 25px;
  border-radius: 5px;
  border-color: #289AFF;
  background-color: #289AFF;
  color: white;
  cursor: pointer;
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

  // 모든 데이터 합치기
  const storesData = { ...signupData[0], ...storeData };

  // console.log(storesData)

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

    StorePostApi(data)
      .then(res => {
        console.log('API 호출 성공:', res);
      })
      .catch(error => {
        console.error('API 호출 실패:', error);
      });
  };

  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData({ ...storeData, [name]: value });
  };

    return (
      <StoreDiv>
        <StoreDivTitle>매장을 등록해주세요</StoreDivTitle>
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
            <Link to="/signup/stores/pos">
              <NextButton type="submit" onClick={handlerNextClick}>다음</NextButton>
            </Link>
        </InsertDiv>
      </StoreDiv>
    );
};

export default StorePage