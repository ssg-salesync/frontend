import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import PosCategory from "../components/pos/PosCategory";
import PosItem from "../components/pos/PosItem";
import { CategoryGetApi } from "../api/pos/category/CategoryGetApi";
import { ItemGetApi } from "../api/pos/item/ItemGetApi";

/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
    height: 80vh;
    display: flex;
`;

// PosCategory 컴포넌트 영역
const PosCategoryDiv = styled.div`
    height: 100%;
    width: 30%;
`;

// 세로선 영역
const VerticalLineDiv = styled.div`
    height: 100%;
    width: 8%;
    margin-left: 3%;
`;

// PosItem, 완료 버튼 전체 영역
const PosItemSubmitButtonDiv = styled.div`
    heigth: 100%;
    width: 56%
`;

// PosItem 컴포넌트 영역
const PosItemDiv = styled.div`
    height: 80%;
    width: 100%;
`;

// 완료 버튼 영역
const SubmitButtonDiv = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

// 세로선
const VerticalLine = styled.div`
    border-left: 1px solid #ccc;
    height: 100%;
    display: flex;
`;

// 여백의 미
const NoDiv = styled.div`
    height: 100%;
    width: 6%;
    color: white;
`;

// 완료 버튼
const SubmitButton = styled.button`
  width: 150%;
  height: 100%;
  margin-right: 20%; 
  border: 1px solid #ccc;
  border-radius: 8%;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 60%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 80%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 120%;
  }
`;


function PosPage() {

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
          } else {
            setCategoryData([]); // 데이터가 없을 경우 빈 배열 설정
          };
  
          const itemResponse = await ItemGetApi();     // [GET: 아이템 정보]
          if (itemResponse) {
            setItemData(itemResponse);
          } else {
            setItemData([]); // 데이터가 없을 경우 빈 배열 설정
          };
          
        } catch (err) {
          console.error(err);
        };
      };
      fetchData();
    }, []);


  // console.log('적용된 카테고리 데이터: ', categoryData)
  // console.log('적용된 아이템 데이터: ', itemData)


  return (
    <ComponentDiv>
      <PosCategoryDiv>
        <PosCategory
          categoryData={categoryData}
          setSelectedCategory={setSelectedCategory}
        />
      </PosCategoryDiv>
      <VerticalLineDiv>
        <VerticalLine/>
      </VerticalLineDiv>
      <PosItemSubmitButtonDiv>
        <PosItemDiv>
          {/* Category의 id만 빼서 PosItem으로 전달 */}
          <PosItem
            itemData={itemData}
            selectedCategoryId={selectedCategory ? selectedCategory.id : null}
          />
        </PosItemDiv>
        <SubmitButtonDiv>
          <Link to="/">
            <SubmitButton>완료</SubmitButton>
          </Link>
        </SubmitButtonDiv>
      </PosItemSubmitButtonDiv>
      <NoDiv/>
    </ComponentDiv>
  );
};

export default PosPage;