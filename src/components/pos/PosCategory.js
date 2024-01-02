import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { CategoryPostApi } from '../../api/pos/category/CategoryPostApi';
import { CategoryGetApi } from '../../api/pos/category/CategoryGetApi';
import { CategoryPutApi } from '../../api/pos/category/CategoryPutApi';
import { CategoryDeleteApi } from '../../api/pos/category/CategoryDeleteApi';

/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 맨 위 카테고리 글자 영역
const TitleDiv = styled.div`
  height: 15%;
  width: 80%;
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
  width: 80%;
  height: 10%;
  display: flex;
  align-items: center;
`;

// 카테고리명 입력칸
const InputField = styled.input`
  width: 100%;
  height: 50%;
  margin-bottom: 5%;
  text-align: center;
  border-radius: 0.5rem;
  background: #FFF;
  border: none;
  font-family: 'Pretendard-Regular';
`;

// 카테고리명 버튼
const CategoryButton = styled.button`
  width: 100%;
  height: 60%;
  margin-bottom: 5%;
  text-align: center;
  border: none;
  background-color: #B4E1FF;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: 'Pretendard-Regular';

  &:hover {
    background-color: #e0e0e0;
  }

  &:focus {
    outline: none;
  }
`;

// 카테고리 삭제 버튼
const RemoveButton = styled.button`
  width: 15%;
  height: 60%;
  border-radius: 0.3rem;
  margin-bottom: 5%;
  cursor: pointer;
  background: url("/img/DeleteBt.png") center/ contain no-repeat;
  background-repeat: no-repeat; // 이미지 반복 방지
  background-color: rgba(0, 173, 239, 0.50);
  display: flex;
  justify-content: center;
  align-items: center;
  border:none;
  // 반응형에 맞게 폰트 크기 조정
  // @media screen and (max-width: 480px) {
  //   font-size: 60%;
  // }

  // @media screen and (min-width: 481px) and (max-width: 1024px) {
  //   font-size: 80%;
  // }

  // @media screen and (min-width: 1025px) {
  //   font-size: 100%;
  // }
`;

// 카테고리 수정 버튼
const EditButton = styled.button`
  // width: 20%;
  // height: 60%;
  width: 15%;
  height: 60%;
  margin-bottom: 5%;
  border-radius: 0.3rem;
  border: none;
  background-color: rgba(28, 57, 94, 0.50);
  cursor: pointer;
  font-family: 'Pretendard-Regular';

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
  width: 80%;
  height: 8%;
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

function PosCategory({ categoryData, setSelectedCategory }) {

  // 카테고리 데이터가 로딩 중인 동안 보여줄 내용 (PosPage가 무거워서 랜더링 좀 걸릴 수도 있음)
  if (!categoryData) {
    return <div><h1>Loading...</h1></div>;
  };

  // 최대 카테고리 갯수
  const maxCategories = 20;

  // 카테고리 상태 저장
  const [categories, setCategories] = useState(categoryData);

  // 수정모드 상태 저장
  const [editModes, setEditModes] = useState(Array(categories.length).fill(false));

  // 카테고리 입력칸 포커스 ref
  const inputRefs = useRef([]);


  // 카테고리 버튼 클릭 이벤트 핸들러
  const handlerCategoryClick = (category) => {

    // 선택된 카테고리 정보를 상태로 저장
    setSelectedCategory(category);
  
    // console.log('카테고리 버튼 누름 : ', category)
  };


  // 카테고리 추가 이벤트핸들러
  // AddButton을 눌렀을 때 editModes를 추가하여 텍스트 입력칸을 생성하도록 변경
  const handlerAddCategory = () => {
  
    // 최대 카테고리 갯수 제한
    if (categories.length >= maxCategories) {
      alert(`최대 ${maxCategories}개까지만 추가할 수 있습니다.`);
      return;
    };


     // 등록 중인 카테고리(입력칸 활성화 상태)가 하나라도 있으면 카테고리 추가 금지
    const isEdits = editModes.some((mode) => mode === true);

    if (isEdits) {
      alert('등록 중인 카테고리가 있습니다. 완료 후 카테고리를 추가해주세요.');
      return;
    };


    // 빈 카테고리 추가
    try {
      const newCategories = [...categories, { id: null, name: '' }];
      setCategories(newCategories);

      const newEditModes = [...editModes, true];
      setEditModes(newEditModes);

      // 비동기적으로 처리하기 위해 타임아웃(시간: 0) 설정
      setTimeout(() => {
        inputRefs.current[newCategories.length - 1]?.focus();
      }, 0);
    } catch (err) {
      console.error(err);
    };
  };

  // console.log(editModes)
  // console.log('categories: ', categories)


  // 수정, 완료 버튼 클릭 시 새로운 카테고리 등록
  const handlerEditMode = async (idx) => {
    if (editModes[idx]) {
      try {
        const newCategoryName = categories[idx].name.trim();

        // 새로운 카테고리의 이름이 비어있지 않으면 API 호출하여 카테고리 등록
        if (newCategoryName !== '') {
          if (categories[idx].id) {

            // 기존 카테고리를 수정하는 로직
            const categoryId = categories[idx].id;
            const updatedCategory = { name: newCategoryName };
            // console.log('카테고리수정 id: ', categoryId)
            // console.log('카테고리수정 이름: ', updatedCategory)
            await CategoryPutApi(categoryId, updatedCategory);    // [PUT: 카테고리 수정]


            // API 호출이 성공하면 해당 카테고리의 이름을 업데이트
            const newCategories = [...categories];
            newCategories[idx].name = newCategoryName;
            setCategories(newCategories);
          } else {

            // 새로운 카테고리를 추가하는 로직
            const newCategory = { name: newCategoryName };
            // console.log('카테고리추가: ', newCategory)
            // setCategories(newCategory.categories)
            // console.log(categories)
            await CategoryPostApi(newCategory);     // [POST: 카테고리 추가]


            // API 호출이 성공하면 서버에서 최신 카테고리 목록을 다시 가져와서 상태를 업데이트
            const latestCategories = await CategoryGetApi();       // [GET: 카테고리 실시간 랜더링]
            setCategories(latestCategories.categories);

            // 추가한 최신 카테고리는 바로 선택상태로 해서 PosItem에서 선택된 카테고리 이름 나오게
            setSelectedCategory(latestCategories.categories[latestCategories.categories.length-1])
            // console.log('latestCategories: ', latestCategories.categories[latestCategories.categories.length-1])
            };

          // 해당 인덱스의 editModes를 false로 설정하여 텍스트 입력칸을 숨김
          const newEditModes = [...editModes];
          newEditModes[idx] = false;
          setEditModes(newEditModes);

          // 입력칸에 포커스
          inputRefs.current[idx]?.focus();
        } else {
          alert('카테고리 이름을 입력해주세요.');
          inputRefs.current[idx]?.focus();
        };
      } catch (err) {
        console.error(err);
      };
    } else {
      const newEditModes = [...editModes];
      newEditModes[idx] = true;
      setEditModes(newEditModes);
    };
  };


  // console.log(editModes)


  // console.log('추가 버튼 눌렀을 때: ', editModes)
  // console.log('수정 버튼 눌렀을 때: ', editModes) 
  // console.log('등록 버튼 눌렀을 때: ', editModes)
  // console.log('삭제 버튼 눌렀을 때: ', editModes)


  // console.log(Array.isArray(categories))
  // console.log(Array.isArray(categoryData))


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
    };
  }, [categories, editModes]);


  // 카테고리 옆의 버튼에 등록, 완료 텍스트 적용
  const getButtonText = (idx) => editModes[idx] ? '등록' : '수정';


  // 카테고리 삭제 이벤트핸들러
  const handlerRemoveCategory = async (idx) => {

    // 삭제할 카테고리 id 참조
    const deleteCategory = categories[idx].id;

    // 삭제 확인 경고창 위한 로직
    const confirmDelete = window.confirm('카테고리를 정말 삭제하겠습니까?');

    // 삭제할 때
    if (confirmDelete) {
      try {
        // 서버에서 카테고리 데이터 삭제
        await CategoryDeleteApi(deleteCategory);    // [DELETE: 카테고리 삭제]

        // 랜더링된 화면에서도 카테고리 삭제
        const newCategories = [...categories];
        newCategories.splice(idx, 1);
        setCategories(newCategories);

        // 카테고리 삭제하면 editModes를 초기화하여 전에 있던 상태가 영향을 주지않게함
        const newEditModes = [...editModes];
        newEditModes.splice(idx, 1);
        setEditModes(newEditModes);
        alert('카테고리가 삭제되었습니다.')

        // 카테고리를 삭제하면 선택된 카테고리도 null로 하여 PosItem 초기화 리렌더링
        setSelectedCategory(null)
      } catch (err) {
          console.error(err);
      };
    } else {
      alert('카테고리 삭제가 취소되었습니다.')
    };
  };

  // console.log('PosCategory_카테고리 정보 : ', categories)

  // console.log(editModes)

  return (
    <ComponentDiv>
      <TitleDiv>
        <h1>카테고리</h1>
      </TitleDiv>
      <CategoryDiv>
        {categories && categories.map((category, idx) => (
          <CategoryContainer key={category.id}>
            {editModes[idx] ? (
              <InputField
                type="text"
                ref={(ref) => (inputRefs.current[idx] = ref)}   // 입력 포커스용 ref
                value={category.name}
                onChange={(e) => handlerEditCategory(idx, e)}
              />
            ) : (
              <CategoryButton onClick={() => handlerCategoryClick(category)}>{category.name}</CategoryButton>
            )}
            <EditButton onClick={() => handlerEditMode(idx)}>{getButtonText(idx)}</EditButton>
            <RemoveButton onClick={() => handlerRemoveCategory(idx)}/>
          </CategoryContainer>
        ))}
        <AddButton onClick={handlerAddCategory}>+</AddButton>
      </CategoryDiv>
    </ComponentDiv>
  );
};

export default PosCategory;