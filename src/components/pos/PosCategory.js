import { useEffect, useState } from 'react';
import styled from 'styled-components';

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 맨 위 카테고리 글자 영역
const TitleDiv = styled.div`
  height: 20%;
  display: flex;
  align-items: center;

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

// 카테고리 전체 영역(위에 글자 제외)
const CategoryDiv = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 카테고리 하나당 영역
const CategoryContainer = styled.div`
  width: 70%;
  height: 10%;
  display: flex;
  align-items: center;
`;

// 카테고리명 입력칸
const InputField = styled.input`
  width: 100%;
  height: 40%;
  margin-bottom: 5%;
  text-align: center;
`;

// 카테고리명 버튼
const CategoryButton = styled.button`
  width: 100%;
  height: 60%;
  margin-bottom: 5%;
  text-align: center;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  &:focus {
    outline: none;
  }
`;

// 카테고리 삭제 버튼
const RemoveButton = styled.button`
  width: 10%;
  height: 48%;
  border-radius: 50%;
  margin-bottom: 5%;
  border: red;
  cursor: pointer;
  background-color: red;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 60%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 80%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 100%;
  }
`;

// 카테고리 수정 버튼
const EditButton = styled.button`
  width: 20%;
  height: 50%;
  margin-bottom: 5%;
  margin-right: 10%;
  border: 1px solid #ccc;
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

// 카테고리 추가 버튼
const AddButton = styled.button`
  width: 70%;
  height: 10%;
  border-radius: 3%;
  border: 1px solid #ccc;
  flex: 0 0 auto;
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


function PosCategory( {categoryData, setSelectedCategory} ) {

  // 최대 카테고리 갯수
  const maxCategories = 8;

  // 카테고리 상태 저장
  const [categories, setCategories] = useState(categoryData);

  // 수정모드 상태 저장
  const [editModes, setEditModes] = useState(Array(categories.length).fill(false));

  // 카테고리 버튼 클릭 이벤트 핸들러
  const handlerCategoryClick = (category) => {
    // 선택된 카테고리 정보를 상태로 저장
    setSelectedCategory(category);

    console.log('PosCategory_카테고리 버튼 누름 : ', category)
  };


  // 카테고리 추가 이벤트핸들러
  const handlerAddCategory = () => {
    if (categories.length < maxCategories) {
      const newCategory = { id: categories.length + 1, name: '' };
      const newCategories = [...categories, newCategory];
      setCategories(newCategories);
    } else {
      alert(`최대 ${maxCategories}개의 카테고리까지만 추가할 수 있습니다.`);
    }
  };


  // [editModes: true => 수정상태 | editModes: false => 완료상태]
  // 카테고리 이름 수정 이벤트핸들러
  const handlerEditCategory = (idx, e) => {
    const newCategories = [...categories];
    newCategories[idx].name = e.target.value;
    setCategories(newCategories);

     // 해당 인덱스의 editModes를 true로 설정하여 수정 중인 상태로 유지
    const newEditModes = [...editModes];
    newEditModes[idx] = true;
    setEditModes(newEditModes);
  };


  // 수정, 완료 버튼 로직
  useEffect(() => {

    // 카테고리가 추가되었을 때, 추가된 카테고리의 editModes를 true로 설정하여 수정 중인 상태로 유지
    if (categories.length > editModes.length) {
      const diff = categories.length - editModes.length;
      const newEditModes = [...editModes, ...new Array(diff).fill(false)];
      setEditModes(newEditModes);
    }
  }, [categories, editModes]);


  // 수정, 완료버튼 토글 이벤트핸들러
  const handlerEditMode = (idx) => {
    const newEditModes = [...editModes];
    newEditModes[idx] = !newEditModes[idx];
    setEditModes(newEditModes);
  };


  // 버튼에 수정, 완료 텍스트 적용
  const getButtonText = (idx) => editModes[idx] ? '완료' : '수정';


  // console.log('수정 버튼 눌렀을 때: ', editModes)


  // 카테고리 삭제 이벤트핸들러
  const handlerRemoveCategory = (idx) => {
    const newCategories = [...categories];
    newCategories.splice(idx, 1);
    setCategories(newCategories);

     // 카테고리 삭제하면 editModes를 초기화하여 전에 있던 상태가 영향을 주지않게함
    const newEditModes = [...editModes];
    newEditModes.splice(idx, 1);
    setEditModes(newEditModes);
   
    
    // console.log('삭제 버튼 눌렀을 때: ', editModes)
  };

  console.log('PosCategory_카테고리 정보 : ', categories)

  return (
    <ComponentDiv>
      <TitleDiv>
        <h1>카테고리</h1>
      </TitleDiv>
      <CategoryDiv>
        {categories.map((category, idx) => (
          <CategoryContainer key={category.id}>
            {editModes[idx] ? (
              <InputField
                type="text"
                value={category.name}
                onChange={(e) => handlerEditCategory(idx, e)}
              />
            ) : (
              <CategoryButton onClick={() => handlerCategoryClick(category)}>{category.name}</CategoryButton>
            )}
            <EditButton onClick={() => handlerEditMode(idx)}>
              {getButtonText(idx)}
            </EditButton>
            <RemoveButton onClick={() => handlerRemoveCategory(idx)}>X</RemoveButton>
          </CategoryContainer>
        ))}
        <AddButton onClick={handlerAddCategory}>+</AddButton>
      </CategoryDiv>
    </ComponentDiv>
  );
};

export default PosCategory;