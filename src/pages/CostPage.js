import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { ItemGetApi } from "../api/pos/item/ItemGetApi";

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

const InputField = styled.input`
  width: 80%;
  height: 50%;
  resize: none;
  text-align: center;
  display: block;
  margin: 0 auto;
  
`;

function CostPage() {
  const [categories, setCategories] = useState([]);

  const [costs, SetCosts] = useState({});



  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ItemGetApi();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // 2개씩 카테고리를 나열하는 함수
  const renderCategories = () => {
    if (categories.length === 0) {
      return <div><h1>Loading...</h1></div>; // 데이터가 없는 경우 로딩을 표시하거나 처리할 수 있음
    }

    const categoryRows = [];
    const length = categories.length;

    for (let i = 0; i < length; i += 2) {
      const firstCategory = categories[i];
      const secondCategory = categories[i + 1];

      categoryRows.push(
        <div key={i / 2} style={{ display: 'flex', marginBottom: '5%' }}>
          {firstCategory && (
            <div>
              <h2>{firstCategory.category_name}</h2>
              <Table>
                <thead>
                  <tr>
                    <Th>&nbsp;&nbsp;아이템 이름&nbsp;&nbsp;</Th>
                    <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가&nbsp;격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
                    <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;원&nbsp;가&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
                  </tr>
                </thead>
                <tbody>
                  {firstCategory.items.map((item) => (
                    <tr key={item.item_id}>
                      <Td>{item.name}</Td>
                      <Td>{item.price}</Td>
                      <Td>{<InputField type="price"/>}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          {secondCategory && (
            <div>
              <h2>{secondCategory.category_name}</h2>
              <Table>
                <thead>
                  <tr>
                    <Th>&nbsp;&nbsp;아이템 이름&nbsp;&nbsp;</Th>
                    <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가&nbsp;격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
                    <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;원&nbsp;가&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
                  </tr>
                </thead>
                <tbody>
                  {secondCategory.items.map((item) => (
                    <tr key={item.item_id}>
                      <Td>{item.name}</Td>
                      <Td>{item.price}</Td>
                      <Td><InputField type="price"/></Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      );
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
        <SubmitButton type="submit">완료</SubmitButton>
      </Link>
    </ComponentDiv>
  );
}

export default CostPage;