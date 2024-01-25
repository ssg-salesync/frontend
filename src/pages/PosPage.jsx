import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import PosCategory from "../components/pos/PosCategory";
import PosItem from "../components/pos/PosItem";
import { CategoryGetApi } from "../api/pos/category/CategoryGetApi";
import { ItemGetApi } from "../api/pos/item/ItemGetApi";

/* eslint-disable */

// const TotalDiv = styled.div`
//   height: 80vh;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;
// PosCategory 컴포넌트 영역
const PosCategoryDiv = styled.div`
  height: 112%;
  width: 25%;
  // flex: 1.5;
  // border-right: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.55);
  // backdrop-filter: blur(1000px);
  overflow-y: auto;
`;
// PosItem 컴포넌트 영역
const PosItemDiv = styled.div`
  height: 112%;
  width: 75%;
  // flex: 4;
`;

function PosPage() {

  const navigate = useNavigate();

  // API 호출해서 가져온 카테고리 데이터 상태 저장
  const [categoryData, setCategoryData] = useState(null);

  // API 호출해서 가져온 아이템 데이터 상태 저장
  const [itemData, setItemData] = useState(null);

  // 해당하는 카테고리에 대한 아이템만 나오게 조건 부여 상태 저장
  const [selectedCategory, setSelectedCategory] = useState(null);

  // API 호출해서 가져온 카테고리, 아이템 데이터
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await CategoryGetApi();   // [GET: 카테고리 정보]
        
        if (categoryResponse && categoryResponse.categories) {
          setCategoryData(categoryResponse.categories);
          
            if (categoryResponse.categories.length > 0) {
              setSelectedCategory(categoryResponse.categories[0]);
            }

        } else {
          setCategoryData([]); // 데이터가 없을 경우 빈 배열 설정
        };

        const itemResponse = await ItemGetApi();     // [GET: 아이템 정보]
        if (itemResponse) {
          setItemData(itemResponse);
        } else {
          setItemData([]); // 데이터가 없을 경우 빈 배열 설정
        };

        // setSelectedCategory(categoryResponse.categories[0].id)
        //   console.log('categoryResponse: ',categoryResponse)
      } catch (err) {
        console.error(err);
        // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
        if (err.response && err.response.status >= 500 && err.response.status < 600) {
        navigate("/500");
      }
      };
    };
    fetchData();
  }, []);


//     useEffect(() => {
//   // 카테고리 목록이 변경될 때마다 selectedCategory 확인
//   if (selectedCategory && categoryData) {
//     const isCategoryExist = categoryData.some(category => category.id === selectedCategory.id);

//     // 선택된 카테고리가 더 이상 존재하지 않으면 null로 설정
//     if (!isCategoryExist) {
//       setSelectedCategory(null);
//     }
//   }
// }, [categoryData, selectedCategory]);

  // console.log('적용된 카테고리 데이터: ', categoryData)
  // console.log('적용된 아이템 데이터: ', itemData)


  return (
    <ComponentDiv>
      <PosCategoryDiv>
        <PosCategory categoryData={categoryData} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}/>
      </PosCategoryDiv>
      <PosItemDiv>
        <PosItem itemData={itemData} selectedCategoryId={selectedCategory ? selectedCategory.id : null}/>
      </PosItemDiv>
    </ComponentDiv>
  );
};

export default PosPage;