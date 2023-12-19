/* eslint-disable */
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

// 아이템 전체 영역
const ItemDiv = styled.div`
  height: 80%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 4%;
  align-content: center
`;

// 아이템 추가 버튼
const AddButton = styled.button`
  width: 30%;
  height: 30%;
  border-radius: 3%;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 100%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 150%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 200%;
  }
`;

// 아이템 하나당 영역
const ItemContainer = styled.div`
  position: relative;
  width: 30%;
  height: 30%;
  border-radius: 5%;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 70%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 100%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 130%;
  }
`;

// 품목명: 입력칸 | 가격: 입력칸
const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5%;
  margin-left: 5%;
`;

// 품목명, 가격 라벨
const ItemLabel = styled.label`
`;

// 아이템 정보 입력칸
const InputField = styled.textarea`
  width: 50%;
  height: 50%;
  resize: none;
  text-align: center;
`;

// 아이템 수정 버튼
const EditButton = styled.button`
  width: 50%;
  height: 20%;
  border: 1px solid #ccc;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 30%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 50%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 70%;
  }
`;

// 아이템 삭제 버튼
const DeleteButton = styled.div`
  position: absolute;
  top: -1%;
  right: -1%;
  background-color: red;
  border: red;
  border-radius: 50%;
  cursor: pointer;
  font-size: 100%;
  color: white;
`;


function PosItem( {itemData, selectedCategoryId}) {
  
  // PosCategory에서 카테고리 버튼눌렀을 때 온 id
  console.log('category_id : ',selectedCategoryId)
  
  // 최대 아이템 갯수
  const maxItems = 5;

  // 아이템 상태 저장
  const [items, setItems] = useState([]);


 // selectedCategoryId의 Id에 따른 item 데이터들을 items 상태로 설정
 useEffect(() => {
  if (selectedCategoryId && itemData && itemData.length > 0) {
    const foundCategory = itemData[0].categories.find(
      (category) => category.category_id === selectedCategoryId
    );

    if (foundCategory && foundCategory.items) {
      setItems(foundCategory.items.map(item => [item.name, item.price.toString()]));
    } else {
      setItems([]); // 해당하는 카테고리가 없을 경우 아이템을 빈 배열로 설정
    }
  } else {
    setItems([]); // selectedCategoryId가 없거나 itemData가 없는 경우 아이템을 빈 배열로 설정
}
}, [selectedCategoryId, itemData]); 


  // 수정모드 상태 저장
  const [editModes, setEditModes] = useState([]);


  // 아이템 수정 이벤트 핸들러
   const handlerEditItem = (idx) => {
    const newEditModes = [...editModes];
    newEditModes[idx] = !newEditModes[idx];
    setEditModes(newEditModes);
  };


  // 카테고리 선택 안 했을 시 추가 버튼 클릭 비활성화
  const [buttonDisabled] = useState(false);


  // 아이템 추가 이벤트핸들러
  const handlerAddItem = () => {
    if (selectedCategoryId === null) {
      alert('카테고리를 선택하세요.');
      return; // 선택된 카테고리가 없는 경우 함수 실행 종료
    }

    if (items.length < maxItems) {
      const newItems = [...items, ['', '']];
      setItems(newItems);
    } else {
      alert(`최대 ${maxItems}개의 아이템까지만 추가할 수 있습니다.`);
    }
  };


  // 아이템 삭제 이벤트핸들러
  const handlerRemoveItem = (idxToRemove) => {
    const updatedItems = items.filter((_, idx) => idx !== idxToRemove);
    setItems(updatedItems);

    // 아이템 삭제하면 editModes를 초기화하여 전에 있던 상태가 영향을 주지않게함
    const newEditModes = [...editModes];
    newEditModes.splice(idxToRemove, 1);
    setEditModes(newEditModes);
  };


  // 아이템 입력 변경 이벤트핸들러
  const handlerInputChange = (e, idx, inputIdx) => {
    const { value } = e.target;
    const updatedItems = [...items];
    updatedItems[idx][inputIdx] = value;
    setItems(updatedItems);
  };


  console.log('PosItem_아이템 정보 : ', items)


  return (
    <ComponentDiv>
      <ItemDiv>
        {items.map((item, idx) => (
          <ItemContainer key={idx}>
            <ItemWrapper>
              <ItemLabel>품목명:</ItemLabel>
              {editModes[idx] ? (
                <InputField value={item[0]} onChange={(e) => handlerInputChange(e, idx, 0)} />
              ) : (
                <div>{item[0]}</div>
              )}
            </ItemWrapper>
            <ItemWrapper>
              <ItemLabel>가&nbsp;&nbsp;&nbsp;격:</ItemLabel>
              {editModes[idx] ? (
                <InputField value={item[1]} onChange={(e) => handlerInputChange(e, idx, 1)} />
              ) : (
                <div>{item[1]}</div>
              )}
            </ItemWrapper>
            <EditButton onClick={() => handlerEditItem(idx)}>{editModes[idx] ? '완료' : '수정'}</EditButton>
            <DeleteButton type='submit' onClick={() => handlerRemoveItem(idx)}>X</DeleteButton>
          </ItemContainer>
        ))}
        <AddButton onClick={handlerAddItem}  disabled={buttonDisabled}>+</AddButton>
      </ItemDiv>
    </ComponentDiv>
  );
};

export default PosItem;