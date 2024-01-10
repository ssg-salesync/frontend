import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRef, useState, useEffect } from 'react';
import { CostGetApi } from "../api/dashboard/cost/CostGetApi";
import { CostPostApi } from "../api/dashboard/cost/CostPostApi";

/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

// 맨 위 글자 영역
const TitleDiv = styled.div`
  height: 25%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

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

// 원가입력 전체 영역(위에 글자 제외)
const CostDiv = styled.div`
 
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// // 완료 버튼 영역
// const ButtonDiv = styled.div`
//   height: 20%;
//   width: 80%;
//   display: flex;
//   justify-content: flex-end;
// `;


// 완료 버튼
const SubmitButton = styled.button`
  margin-bottom: 50%;
  width: 150%;
  height: 75%;
  border: none;
  border-radius: 8%;
  cursor: pointer;
  border-radius: 0.5rem;
  background: #1C395E;
  color: #FFF;

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

const Table = styled.table`
  border-collapse: collapse;
  background-color: white;
  width: 150%;
`;

const Th = styled.th`
  width: 100%;
  height: 200%;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 0.5625rem;
  border:none;
  background-color: #1D56A8;
  cursor: pointer;

  color: #FFF;
  font-family: 'Pretendard-Regular';
  font-size: 130%;
  font-weight: 400;
  line-height: normal;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const InputField = styled.input`
  width: 80%;
  height: 50%;
  resize: none;
  text-align: center;
  display: block;
  margin: 0 auto;
`;

function CostPage() {
  


  const [costData, setCostData] = useState([]);


   // 아이템의 입력 상태 관리를 위한 state 추가
   const [editingItem, setEditingItem] = useState(null);

   // 수정된 값을 저장하는 함수
   const handlerEdit = (itemId, updatedCost) => {
     const updatedData = costData.map(item => {
       if (item.item_id === itemId) {
         return { ...item, cost: updatedCost };
       }
       return item;
     });
     setCostData(updatedData);
     setEditingItem(null); // 입력 필드를 버튼으로 되돌림
   };

  

  const handlerInputChange = (itemId) => {
    setEditingItem(itemId);
  };

  // Enter 키를 눌렀을 때 값을 저장하는 함수
  const handlerKeyDown = (event, itemId) => {
    if (event.key === 'Enter') {
      handlerEdit(itemId, event.target.value);
    }
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await CostGetApi();
        setCostData(data.items);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  console.log('costData: ', costData)

  const handlerComplete = async () => {
    try {
      const itemsToSend = costData
        .filter(item => item.cost !== null)
        .map(item => ({ item_id: item.item_id, cost: parseInt(item.cost) }));

      console.log('POST 데이터 확인: ', itemsToSend)

      await CostPostApi({ items: itemsToSend });
    } catch (err) {
      console.error(err);
    };
  };


  // 2개씩 카테고리를 나열하는 함수
  const renderCategories = () => {
    if (costData.length === 0) {
      return <div><h1>Loading...</h1></div>; // 랜더링 시 로딩을 표시
    }
  
    const sortedData = {}; // category_id 별로 데이터 정리
    costData.forEach((item) => {
      const { category_id, category_name } = item;
      if (!sortedData[category_id]) {
        sortedData[category_id] = { category_name, items: [] };
      }
      sortedData[category_id].items.push(item);
    });
  
    const categoryIds = Object.keys(sortedData);
    const categoryRows = [];
    
  
    // category_id에 따라 홀수는 왼쪽으로, 짝수는 오른쪽으로
    for (let i = 0; i < categoryIds.length; i += 2) {
      const categoryId1 = categoryIds[i];
      const categoryId2 = categoryIds[i + 1];
  
      const categoryRow = (
        <div key={`${categoryId1}_${categoryId2}`} style={{ display: 'flex', marginBottom: '5%' }}>
          <div style={{ flex: 1, marginLeft: '-15%', marginRight: '20%' }}>
            {categoryId1 && (
              <>
                <h2>{sortedData[categoryId1].category_name}</h2>
                <Table>
                  <thead>
                    <tr>
                      <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;아이템 이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
                      <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가&nbsp;격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
                      <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;원&nbsp;가&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData[categoryId1].items.map((category, idx) => (
                      <tr key={idx}>
                        <Td>{category.name}</Td>
                        <Td>{category.price}</Td>
                        <Td>
                          {/* 아이템의 cost 상태에 따라 버튼 또는 입력 필드 표시 */}
                          {editingItem === category.item_id ? (
                            <InputField
                              defaultValue={category.cost !== null ? `${category.cost}` : ''}
                              onKeyDown={(e) => handlerKeyDown(e, category.item_id)}
                            />
                          ) : (
                            <Button onClick={() => handlerInputChange(category.item_id)}>
                              {category.cost !== null ? `${category.cost}` : '입력'}
                            </Button>
                          )}
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </div>
          <div style={{ flex: 1, marginLeft: '20%' }}>
            {categoryId2 && (
              <>
                <h2>{sortedData[categoryId2].category_name}</h2>
                <Table>
                  <thead>
                    <tr>
                      <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;아이템 이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
                      <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가&nbsp;격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
                      <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;원&nbsp;가&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData[categoryId2].items.map((category, idx) => (
                      <tr key={idx}>
                        <Td>{category.name}</Td>
                        <Td>{category.price}</Td>
                        <Td>
                          {/* 아이템의 cost 상태에 따라 버튼 또는 입력 필드 표시 */}
                          {editingItem === category.item_id ? (
                            <InputField
                              defaultValue={category.cost !== null ? `${category.cost}` : ''}
                              onKeyDown={(e) => handlerKeyDown(e, category.item_id)}
                            />
                          ) : (
                            <Button onClick={() => handlerInputChange(category.item_id)}>
                              {category.cost !== null ? `${category.cost}` : '입력'}
                            </Button>
                          )}
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </div>
        </div>
      );
  
      categoryRows.push(categoryRow);
    }
  
    return categoryRows;
  };

  return (
    <ComponentDiv>
      <TitleDiv>
        <h1>원가 입력</h1>
      </TitleDiv>
      <CostDiv>
        {renderCategories()}
      </CostDiv>
      <Link to="/home">
        <SubmitButton type="button" onClick={handlerComplete}>완료</SubmitButton>
      </Link>
    </ComponentDiv>
  );
}

export default CostPage;