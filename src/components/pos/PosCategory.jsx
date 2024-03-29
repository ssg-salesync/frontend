import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { useSetRecoilState } from 'recoil';
import { CategoryPostApi } from '../../api/pos/category/CategoryPostApi';
import { CategoryGetApi } from '../../api/pos/category/CategoryGetApi';
import { CategoryPutApi } from '../../api/pos/category/CategoryPutApi';
import { CategoryDeleteApi } from '../../api/pos/category/CategoryDeleteApi';
import { CategoryState } from '../../recoil/atoms/CategoryState';

/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 7%;
  padding-left: 7%;
`;

// 맨 위 카테고리 글자 영역
const TitleDiv = styled.div`
  height: 10%;
  margin-top: 3%;
  width: 80%;

  cursor: default;

  display: flex;
  align-items: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 70%;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 90%;
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
  justify-content: center;
  gap:2%;
`;
// 카테고리명 입력칸
const InputField = styled.input`
  width: 100%;
  height: 64%;
  // margin-bottom: 5%;
  text-align: center;
  border-radius: 0.3rem;
  background: #FFF;
  border: 1px solid rgba(185, 185, 185, 1);
  font-family: 'Pretendard-Regular';
  font-size: 100%;
  white-space: nowrap;

  &:focus {
    outline: 1px solid rgba(185, 185, 185, 1);
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 10px;
    // padding: 2px 4px;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 50%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 90%;
    // padding: 5px 5px;
  }
`;
// 카테고리명 read
const CategoryButton = styled.button`
  width: 100%;
  height: 70%;
  // margin-bottom: 5%;
  text-align: center;
  background-color: rgba(171, 211, 246, 0.6);
  border: 1px solid rgba(149, 195, 234, 1);
  border-radius: 0.3rem;
  cursor: pointer;
  font-family: 'Pretendard-Regular';
  font-size: 100%;
  white-space: nowrap;

  &:hover {
    background-color: rgba(180, 225, 255, 1);
  }

  &:focus {
    outline: none;
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 10px;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 50%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 100%;
  }
`;
// 카테고리 등록 <-> 수정 버튼
const EditButton = styled.button`
  width: 20%;
  height: 70%;
  
  border-radius: 0.3rem;
  border: 1px solid rgba(185, 185, 185, 1);
  background-color: rgba(221, 221, 221, 0.6);
  cursor: pointer;
  font-family: 'Pretendard-Regular';
  white-space: nowrap;
  
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0e0e0;
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 20%;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 50%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 90%;
  }
`;
// 카테고리 삭제 버튼
const RemoveButton = styled.button`
  width: 20%;
  height: 70%;
  border-radius: 0.3rem;
  cursor: pointer;

  background-color: rgba(171, 211, 246, 0.6);
  border: 1px solid rgba(149, 195, 234, 1);

  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(180, 225, 255, 1);
  }
`;
const RemoveIcon = styled(IoClose)`
  width: 1.8em;
  height: 1.8em;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    width: 1em;
    height: 1em;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 1em;
    height: 1em;
  }
  @media screen and (min-width: 1025px) {
    width: 1.8em;
    height: 1.8em;
  }
`;
const AddButtonDiv = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// 카테고리 추가 버튼
const AddButton = styled.button`
  width: 80%;
  height: 7%;
  border-radius: 0.3rem;
  border: 1px solid rgba(185, 185, 185, 1);
  background-color: rgba(221, 221, 221, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
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

function PosCategory({ categoryData, setSelectedCategory, selectedCategory }) {

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
  
  // alert 3초후 자동으로 닫힘
  const showAlert= (msg)=>{
    alert(msg);
    setTimeout(function() {
      // alert 창이 닫히도록 함
      window.close();
    }, 3000); // 3초 후에 실행
  }

  // 카테고리 추가 이벤트핸들러
  // AddButton을 눌렀을 때 editModes를 추가하여 텍스트 입력칸을 생성하도록 변경
  const handlerAddCategory = () => {
  
    // 최대 카테고리 갯수 제한
    if (categories.length >= maxCategories) {
      showAlert('최대 ${maxCategories}개까지만 추가할 수 있습니다.');
      return;
    };


     // 등록 중인 카테고리(입력칸 활성화 상태)가 하나라도 있으면 카테고리 추가 금지
    const isEdits = editModes.some((mode) => mode === true);

    if (isEdits) {
      showAlert("등록 중인 카테고리가 있습니다. 완료 후 카테고리를 추가해주세요.");
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
  const navigate = useNavigate();
  const setCategoryState = useSetRecoilState(CategoryState)
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
          showAlert('카테고리 이름을 입력해주세요.');
          inputRefs.current[idx]?.focus();
        };
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status >= 500 && err.response.status < 600) {
          // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
          navigate("/500");
        }
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

  useEffect(()=>{
    if(categories.length == 0){
      setCategoryState(true)
      console.log("setCategoryState(true)",categories.length)
    }else{
      setCategoryState(false)
      console.log("setCategoryState(false)",categories.length)
    }
  },[categories])

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
        showAlert('카테고리가 삭제되었습니다.')

        // 현재 선택된 카테고리가 삭제될 카테고리랑 같으면 초기 빈 화면 출력 | 다르면 현재 선택된 카테고리 유지
        if (selectedCategory.id === deleteCategory) {
          setSelectedCategory(null);
        }
        
      } catch (err) {
          console.error(err);
          if (err.response && err.response.status >= 500 && err.response.status < 600) {
            // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
            navigate("/500");
          }
      };
    } else {
      showAlert('카테고리 삭제가 취소되었습니다.')
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
            <RemoveButton onClick={() => handlerRemoveCategory(idx)}><RemoveIcon/></RemoveButton>
          </CategoryContainer>
        ))}
        <AddButton onClick={handlerAddCategory}>+</AddButton>
      </CategoryDiv>
    </ComponentDiv>
  );
};

export default PosCategory;