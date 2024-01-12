import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ItemGetApi } from '../../api/pos/item/ItemGetApi';
import { ItemDeleteApi } from '../../api/pos/item/ItemDeleteApi';
import { ItemPostApi } from '../../api/pos/item/ItemPostApi';
import { ItemPutApi } from '../../api/pos/item/ItemPutApi';


/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-left: 4%;
`;
// 선택한 카테고리 글자 영역
const TitleDiv = styled.div`
  height: 10%;
  width: 100%;
  margin-left: 2%;
  display: flex;
  align-items: center;
  border: 5%;
  font-weight: 900;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 100%;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 140%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 180%;
  }
`;
// 아이템 전체 영역
const ItemDiv = styled.div`
  height: 80%;
  width: 100%;
  // margin-top: 2%;
  // margin-left: 4%;
  // padding: 2%;
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
  overflow: auto;
  margin-left: 2%;
`;
// 완료 버튼 영역
const SubmitButtonDiv = styled.div`
  height: 8%;
  width: 100%;
  display: flex;
  // align-items: center;
  justify-content: right;
  // margin-left: 85%;
`;
// 완료 버튼
const SubmitButton = styled.button`
  width: 8%;
  height: 70%;

  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background: #1C395E;
  color: #FFF;
  float: right;
  font-family: 'Pretendard-Regular';
  
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap; // 버튼 내 줄바꿈 금지

  &:hover {
    background-color: #e0e0e0;
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 40%;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 80%;
  }  
  @media screen and (min-width: 1025px) {
    font-size: 110%;
  }
`;
// 아이템 하나당 영역
const ItemContainer = styled.div`
  position: relative;
  // width: 30%;
  width : calc(30% - 0.5rem);
  height: 40%;
  border-radius: 5%;
  background: #FFF;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 40%;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 80%;
  }  
  @media screen and (min-width: 1025px) {
    font-size: 120%;
  }
`;
// 품목명: 입력칸 | 가격: 입력칸
const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin-right: 5%;
  // margin-left: 5%;
  margin: 3%;
`;
// 품목명, 가격 라벨  
const ItemLabel = styled.label`
`;
// 아이템 정보 입력칸
const InputField = styled.input`
  width: 50%;
  height: 50%;
  resize: none;
  text-align: center;
`;
// 아이템 수정 버튼
const EditButton = styled.button`
  width: 40%;
  height: 18%;
  // border: 1px solid #ccc;
  border: none;
  border-radius: 0.3rem;
  font-family: Pretendard-Regular;
  cursor: pointer;
  margin-top: 5%;

  &:hover {
    background-color: #e0e0e0;
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    font-size: 30%;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 50%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 70%;
  }
`;
// 아이템 삭제 버튼
const DeleteButton = styled.button`
  width: 13%;
  height: 13%;
  position: absolute;
  top: 0%;
  right: 0%;
  margin: 1%;

  // background-color: rgba(0, 173, 239);
  background-color: #FFF;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  // color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fff;
    color: #2D69C4;
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    width: 20%;
    height: 1em;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    width: 18%;
    height: 13%;
  }
  @media screen and (min-width: 1025px) {
    width: 13%;
    height: 13%;
  }
`;
const DeleteIcon = styled(IoClose)`
  width: 1.5em;
  height: 1.5em;
  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 750px) {
    width: 1em;
    height: 1em;
  }
  @media screen and (min-width: 750px) and (max-width: 1024px) {
    width: 1em;
    height: 1em;
  }
  @media screen and (min-width: 1025px) {
    width: 1.5em;
    height: 1.5em;
  }
`;
// 아이템 추가 버튼
const AddButton = styled.button`
  width: 28%;
  height: 40%;
  border-radius: 3%;
  // border: 1px solid #ccc;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #FFF;

  &:hover {
    background-color: #B4E1FF;
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

function PosItem({ itemData, selectedCategoryId }) {

  // 아이템 데이터가 로딩 중인 동안 보여줄 내용 (PosPage가 무거워서 랜더링 좀 걸릴 수도 있음)
  if (!itemData) {
  return <div><h1>Loading...</h1></div>;
  };

  // 최대 아이템 갯수
  const maxitems = 10;

  // 아이템 상태 저장
  const [items, setItems] = useState(itemData);

  // 수정모드 상태 저장
  const [editModes, setEditModes] = useState(Array((items && items.categories && items.categories.length) || 0).fill(false));

  // 아이템 입력칸 포커스 ref
  const inputRefs = useRef([]);

  // console.log('items.categories: ', items.categories)

  // 선택한 카테고리의 아이템을 가져옴
  const getItemsBySelectedCategory = () => {
    if (items && items.categories && selectedCategoryId !== null) {
      const selectedCategory = items.categories.find(
        (category) => category.category_id === selectedCategoryId
      );
      // console.log('선택한 카테고리 아이디(내부): ', selectedCategory)
      
      return selectedCategory ? selectedCategory.items : [];
    } else {
      return [];
    };
  };


  // 선택한 카테고리의 이름을 가져옴
  const getNameBySelectedCategory = () => {
    if (items && items.categories && items.categories.length > 0) {
      const selectedCategoryName = items.categories.find(
        (category) => category.category_id === selectedCategoryId
      );
      // console.log('선택한 카테고리 이름: ', selectedCategoryName)
      return selectedCategoryName ? selectedCategoryName.category_name : '';
    } else {
      return '';
    };
  };

  console.log('선택한 카테고리 아이디(외부): ', selectedCategoryId)
  

  // console.log('itemData: ', itemData)


  // 아이템 추가 이벤트핸들러
  // AddButton을 눌렀을 때 editModes를 추가하여 텍스트 입력칸을 생성하도록 변경
  const handlerAddItem = () => {

  // console.log('selectedCategoryId: ', selectedCategoryId)
  // console.log('selectedCategory.items: ', selectedCategory.items)
  // console.log('items.categories.items: ', items.categories.items)


    // 선택된 카테고리가 없으면 경고창
    if (!selectedCategoryId) {
      alert('카테고리를 선택해주세요.'); // 선택된 카테고리가 없으면 경고창 띄우고
      return;
    };

    // 선택된 카테고리의 해당 아이템을 찾음
    const selectedCategory = items.categories.find(
      (category) => category.category_id === selectedCategoryId
    );

    // 최대 아이템 등록 갯수 제한
    if (selectedCategory && selectedCategory.items.length >= maxitems) {
      alert(`최대 ${maxitems}개까지만 추가할 수 있습니다.`);
      return;
    };


    // 등록 중인 아이템(입력칸 활성화 상태)이 하나라도 있으면 아이템 추가 금지
    const isEdits = editModes.some((mode) => mode === true);

    if (isEdits) {
      alert('등록 중인 아이템이 있습니다. 완료 후 아이템을 추가해주세요.');
      return;
    };


    try {
      setItems((prevItems) => {
        const selectedCategoryIndex = prevItems.categories.findIndex(
          (category) => category.category_id === selectedCategoryId
        );

        const updatedCategories = [...prevItems.categories];
        const newCategoryItems = [
          ...updatedCategories[selectedCategoryIndex].items,
          { name: '', price: '' },
        ];

        updatedCategories[selectedCategoryIndex].items = newCategoryItems;
        const updatedItems = { ...prevItems, categories: updatedCategories };

        // 새로운 아이템은 수정 모드(true)로 추가
        const newEditModes = Array.from(
          { length: newCategoryItems.length },
          (_, index) => index === newCategoryItems.length - 1
        );

        // console.log(newEditModes); // 추가

        setEditModes(newEditModes);

        // 비동기적으로 처리하기 위해 타임아웃(시간: 0) 설정
        setTimeout(() => {
          const lastIndex = newCategoryItems.length - 1;
          inputRefs.current[lastIndex]?.focus();
        }, 0);

        return updatedItems;
      });
    } catch (err) {
      console.error(err);
    };
  };

// console.log('items: ', items)
// console.log('아이템 이름: ', items.categories[0].items[0].name.trim() )
// console.log('아이템 가격: ', items.categories[0].items[0].price )

// 수정, 완료 버튼 클릭 시 새로운 카테고리 등록
const handlerEditMode = async (idx) => {
  try {
    const currentItem = getItemsBySelectedCategory()[idx];

    if (editModes[idx]) {
      const newItemName = currentItem.name.trim();
      const newItemPrice = currentItem.price;

      if (newItemName !== '' && newItemPrice !== '') {
        const categoryId = selectedCategoryId;
        if (currentItem.item_id) {
          const itemId = currentItem.item_id;
          const updatedItem = { name: newItemName, price: newItemPrice };
          await ItemPutApi(itemId, updatedItem);

          const updatedItems = getItemsBySelectedCategory().map((item, index) => {
            if (index === idx) {
              return { ...item, name: newItemName, price: newItemPrice };
            };
            return item;
          });

          const updatedCategories = itemData.categories.map((category) => {
            if (category.category_id === selectedCategoryId) {
              return { ...category, items: updatedItems };
            };
            return category;
          });

          setItems({ categories: updatedCategories });

          const newEditModes = [...editModes];
          newEditModes[idx] = false;
          setEditModes(newEditModes);

          inputRefs.current[idx]?.focus();
        } else {
          const newItem = { name: newItemName, price: newItemPrice };
          await ItemPostApi(categoryId, newItem);

          const latestItems = await ItemGetApi();
          setItems(latestItems);

           // 새로운 아이템이 추가될 때 해당하는 editModes를 false로 설정하여 완료 상태로 변경
          const newEditModes = [...editModes];
          newEditModes[idx] = false;
          setEditModes(newEditModes);
        };
      } else {
        alert('아이템 전체 정보를 입력해주세요.');
        inputRefs.current[idx]?.focus();
      };
    } else {
      const newEditModes = [...editModes];
      newEditModes[idx] = true;
      setEditModes(newEditModes);
    };
  } catch (err) {
    console.error(err);
  };
};


// console.log('추가 버튼 눌렀을 때: ', editModes)
// console.log('수정 버튼 눌렀을 때: ', editModes) 
// console.log('등록 버튼 눌렀을 때: ', editModes)
// console.log('삭제 버튼 눌렀을 때: ', editModes)


// console.log(Array.isArray(items))
// console.log(Array.isArray(itemData))

// console.log('itemData: ', itemData)

// [editModes: true => 수정상태 | editModes: false => 완료상태]
// 아이템 수정 이벤트핸들러
const handlerEditItem = (idx, e, field) => {
  try {
    // console.log('Editing item:', idx, e.target.value, field); // 변경된 아이템 및 값 로그
    // console.log('items: ', items)
    // console.log('itemData: ', itemData)
    
    if (items && items.categories) {
      const selectedCategory = items.categories.find(
        (category) => category.category_id === selectedCategoryId
      );

      if (selectedCategory && selectedCategory.items && selectedCategory.items[idx]) {
        const updatedItems = [...selectedCategory.items]; // 선택된 카테고리 내 아이템 복사

        // 선택된 카테고리 내 아이템의 필드 값 변경
        updatedItems[idx][field] = e.target.value;

        // 아이템 가격 입력 필드 숫자만 입력하게 조건 부여
        if (field === 'price') {
          const priceValue = e.target.value;

          // 숫자가 아닌 경우 경고 메시지 출력
          if (isNaN(priceValue)) {
            alert('가격은 숫자만 입력해주세요.');
            return;
          };
        };

        // 카테고리 내 아이템 업데이트
        const updatedCategories = items.categories.map((category) => {
          if (category.category_id === selectedCategoryId) {
            return { ...category, items: updatedItems };
          };
          return category;
        });

        // 상태 업데이트
        setItems((prevItems) => ({
          ...prevItems,
          categories: updatedCategories,
        }));
      } else {
        console.error('선택된 카테고리나 아이템을 찾을 수 없습니다.');
      };
    } else {
      console.error('카테고리를 찾을 수 없습니다.');
    };
  } catch (err) {
    console.error(err);
  };
};

// console.log('itemData: ', itemData)
// console.log('itemData.categories: ', itemData.categories)

// 수정, 완료 버튼 로직
// useEffect(() => {

//   // 카테고리가 추가되었을 때, 추가된 카테고리의 editModes를 true로 설정하여 수정 중인 상태로 유지
//   if (items.length > editModes.length) {
//     const diff = items.length - editModes.length;
//     const newEditModes = [...editModes, ...new Array(diff).fill(false)];
//     setEditModes(newEditModes);
//   };
// }, [items, editModes]);

// PosCategory에서 카테고리 신규 등록 후 상태가 렌더링 없이 유지되게 한번 더 [GET 요청]
useEffect(() => {
  const fetchItems = async () => {
    try {
      const itemData = await ItemGetApi();    // [GET: 카테고리,  실시간 랜더링]
      setItems(itemData); // 가져온 아이템 목록으로 상태 업데이트
    } catch (err) {
      console.error(err);
    };
  };

  // selectedCategoryId가 변경될 때마다 새로운 아이템 목록을 가져옴
  fetchItems();
}, [selectedCategoryId]);


useEffect(() => {
  if (selectedCategoryId !== null && items && items.categories && items.categories.length > 0) {
    // 선택된 카테고리 또는 아이템 배열의 길이가 변경될 때 editModes를 false 값으로 초기화
    setEditModes(Array(items.categories.length).fill(false));
  };
}, [selectedCategoryId, items?.categories?.length]);


console.log(selectedCategoryId)



// 아이템 정보 아래 버튼에 등록, 완료 텍스트 적용
const getButtonText = (idx) => editModes[idx] ? '등록' : '수정';


// 아이템 삭제 이벤트핸들러
const handlerRemoveItem = async (idx) => {

  const confirmDelete = window.confirm('아이템을 정말 삭제하겠습니까?');

  if (confirmDelete) {

    try {
      const deleteItemId = getItemsBySelectedCategory()[idx].item_id; // 현재는 예시로 items 배열의 idx번째 아이템의 id를 사용한 것으로 가정합니다.
  
      // console.log('items[idx].id: ' items[idx].id)
      // console.log(deleteItemId) 
        
      // 서버에서 아이템 데이터 삭제
      await ItemDeleteApi(deleteItemId);

      // 새로운 아이템 배열 생성 (삭제된 아이템을 제외한 나머지 아이템들)
      setItems(prevItems => {
        const updatedItems = prevItems.categories.map(category => {
          if (category.category_id === selectedCategoryId) {
            const newItems = category.items.filter((_, index) => index !== idx);
            return { ...category, items: newItems };
          };
          return category;
        });
        return { categories: updatedItems };
      });

      // 삭제된 아이템에 해당하는 editModes도 업데이트
      const newEditModes = editModes.filter((_, index) => index !== idx);
      setEditModes(newEditModes);
      alert('아이템이 삭제되었습니다.')
    } catch (err) {
      console.error(err);
    };
  } else {
    alert('아이템 삭제가 취소되었습니다.')
  };
};

// console.log('Positem_카테고리 정보 : ', items)

// console.log(editModes)
// 회원가입 버튼 클릭
const navigate = useNavigate();

const handlerSubmitClick = () =>{
  navigate("/home")
}

return (
  <ComponentDiv>
      <TitleDiv>
        {/* <h1>{getNameBySelectedCategory()}</h1> */}
        {getNameBySelectedCategory()}
      </TitleDiv>
      <ItemDiv>
        {getItemsBySelectedCategory().map((item, itemIndex) => (
          <ItemContainer key={itemIndex}>
            <ItemWrapper>
              <ItemLabel>품목명: &nbsp;</ItemLabel>
                {editModes[itemIndex] ? (
                  <InputField
                    type="text"
                    ref={(ref) => (inputRefs.current[itemIndex] = ref)} // 입력 포커스용 ref
                    value={item.name}
                    onChange={(e) => handlerEditItem(itemIndex, e, 'name')}
                  />
                ) : (
                <div>{item.name}</div>
                )}
            </ItemWrapper>
            <ItemWrapper>
              <ItemLabel>가격: &nbsp;</ItemLabel>
                {editModes[itemIndex] ? (
                  <InputField
                    type="text"
                    // ref={(ref) => (inputRefs.current[itemIndex] = ref)} // 입력 포커스용 ref
                    value={item.price}
                    onChange={(e) => handlerEditItem(itemIndex, e, 'price')}
                  />
                ) : (
                <div>{item.price}</div>
                )}
            </ItemWrapper>
            <EditButton onClick={() => handlerEditMode(itemIndex)}>
              {getButtonText(itemIndex)}
            </EditButton>
            <DeleteButton onClick={() => handlerRemoveItem(itemIndex)}><DeleteIcon/></DeleteButton>
          </ItemContainer>
        ))}
          <AddButton onClick={handlerAddItem}>+</AddButton>
      </ItemDiv>
      <SubmitButtonDiv>
            <SubmitButton onClick={handlerSubmitClick}>완료</SubmitButton>
          {/* <Link to="/home">
            <SubmitButton>완료</SubmitButton>
          </Link> */}
      </SubmitButtonDiv>
  </ComponentDiv>
  );
};

export default PosItem;