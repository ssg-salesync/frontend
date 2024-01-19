import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { CostsGetApi } from "../api/dashboard/costs/CostsGetApi";
import { CostsPostApi } from "../api/dashboard/costs/CostsPostApi";

/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  // overflow: hidden;
`;
const TotalDiv = styled.div`
  height: 85%;
  width: 60%;
  background-color: #fff;
  border-radius: 1rem;
  margin-bottom: 2%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
`

// 맨 위 글자 영역
const TitleDiv = styled.div`
  height: 15%;
  width: 100%;
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
    font-size: 120%;
  }
`;

// 원가입력 전체 영역(위에 글자 제외)
const CostDiv = styled.div`
  width: 100%;
  height: 90%;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // overflow-y: auto;
`;
const BtDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
`
const Item = styled.div`
  width: 100%;
  height: 100%;
  // border: 0.5rem;
  // background-color : gray;  
  display: flex;
  // flex-wrap: wrap;  /* 아이템들을 여러 줄로 나누기 위해 flex-wrap 추가 */
  flex-direction: column;
  // justify-content: center;
  align-items:center;
  text-align: center;
  overflow: auto;
`
const Menu = styled.div`
  // width: 25%;
  width: 80%;
  // height: 100%;
  margin : 0.7rem;
  background-color : #FFF;
  border-radius: 0.5rem;
  font-size: 120%;

  // 반응형
  @media screen and (max-width: 768px) {
    font-size: 80%;
    margin : 0.5rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 100%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 120%;
  }
`
const MenuDiv = styled.div`
`
const MenuDtDiv = styled.div`
  height: 5%;
  width: 100%;
  // margin-top: 5%;
  display:flex;
  align-items:center;
  justify-content: center;
  // flex-direction: row;
`
const MenuDtNameTitleDiv = styled.div`
  height: 100%;
  width: 80%;
  border: 1px solid #ddd;
  padding: 2%;
  // margin: 2%;
  display:flex;
  align-items:center;
  justify-content: center;
  background: #1C395E;
  color: #FFF;
`
const MenuDtPriceTitleDiv = styled.div`
  height: 100%;
  width: 20%;
  border: 1px solid #ddd;
  padding: 2%;
  background: #1C395E;
  color: #FFF;
`
const MenuDtCostTitleDiv = styled.div`
  height: 100%;
  width: 20%;
  border: 1px solid #ddd;
  padding: 2%;
  background: #1C395E;
  color: #FFF;
`
const MenuDtNameDiv = styled.div`
  height: 100%;
  width: 80%;
  border: 1px solid #ddd;
  padding: 2%;
  // margin: 2%;
  display:flex;
  align-items:center;
  justify-content: center;
`
const MenuDtPriceDiv = styled.div`
  height: 100%;
  width: 20%;
  border: 1px solid #ddd;
  padding: 2%;
`
const MenuDtCostDiv = styled.div`
  height: 100%;
  width: 20%;
  border: 1px solid #ddd;
  padding: 1.9%;    
  
  display:flex;
  align-items:center;
  justify-content: center;
`
const CostInput = styled.input`
  height: 100%;
  width: 100%;
  font-size: 90%;
  text-align: center;
  box-sizing: content-box;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
// 완료 버튼
const SubmitButton = styled.button`
  // margin-bottom: 50%;
  // width: 10%;
  // height: 100%;
  padding: 10px 40px;
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

// const Table = styled.table`
//   border-collapse: collapse;
//   background-color: white;
//   width: 150%;
// `;

// const Th = styled.th`
//   width: 100%;
//   height: 200%;
//   border: 1px solid #ddd;
//   padding: 8px;
//   text-align: center;
// `;

// const Td = styled.td`
//   border: 1px solid #ddd;
//   padding: 2%;
//   text-align: center;
// `;

// const CostButton = styled.button`
//   width: 100%;
//   height: 100%;
//   border-radius: 0.5625rem;
//   border:none;
//   background-color: #1D56A8;
//   cursor: pointer;

//   color: #FFF;
//   font-family: 'Pretendard-Regular';
//   font-size: 130%;
//   font-weight: 400;
//   line-height: normal;

//   &:hover {
//     background-color: #e0e0e0;
//   }
// `;

// const InputField = styled.input`

//   // 입력칸 좌우크기 고정...
//   width: 100%;
//   height: 100%;
//   text-align: center;
// `;

function CostPage() {
  
  // GET으로 받아온 데이터와 새로 입력한 데이터의 상태 관리
  const [costData, setCostData] = useState([]);
  const handleCostChange = (categoryId, itemId, newCost)=>{
    const newCostData = costData.map(category => ({
      ...category,
      items: category.items.map(item => {
        if (item.item_id === itemId && category.category_id === categoryId) {
          console.log(newCost)
          return {
            ...item,
            cost: newCost === "" ? parseInt(0, 10) : parseInt(newCost, 10), // 원하는 값으로 변경
          };
        }
        return item;
      }),
    }));
    setCostData(newCostData)
  }
  // 아이템의 입력 상태 관리
  // const [editingItem, setEditingItem] = useState(null);
  
  // 수정된 값을 저장
  // const handlerEdit = (itemId, updatedCost) => {

  //   const updatedData = costData.map(item => {
  //     if (item.item_id === itemId) {

  //       // cost가 price보다 높으면 경고창 띄우고 수정하지 않음
  //       if (updatedCost > item.price) {
  //         alert('원가가 원래 가격보다 높습니다.');
  //         return item;    // 적용하지 않고 이전 값 반환
  //       }    
  //       return { ...item, cost: updatedCost };
  //     }
  //     return item;
  //   });
  //   setCostData(updatedData);
  //   setEditingItem(null); // 입력 필드를 버튼으로 되돌림
  // };

  // 입력 칸의 데이터 변화
  // const handlerInputChange = (itemId) => {
  //   setEditingItem(itemId);
  // };


  // Enter 키를 눌렀을 때 값을 저장
  // const handlerKeyDown = (e, itemId) => {
  //   if (e.key === 'Enter') {
  //     handlerEdit(itemId, e.target.value);
  //   }
  // };

  const navigate = useNavigate();
  // GET 메서드로 기존 costData 가져옴
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await CostsGetApi();
        setCostData(data.items);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status >= 500 && err.response.status < 600) {
          // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
          navigate("/500");
        }
      }
    }
    fetchData();
  }, []);

  console.log('costData: ', costData)


  // 완료버튼 클릭시 POST로 데이터 보냄
  const handlerSubmit = async () => {
    try {
      const itemsToSend = costData
      console.log('POST 데이터 확인: ', itemsToSend)

      await CostsPostApi({ items: itemsToSend });
      navigate("/home")
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status >= 500 && err.response.status < 600) {
        // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
        navigate("/500");
      }
    };
  };


  // // 2개씩 카테고리를 나열하는 함수
  // const renderCategories = () => {
  //   if (costData.length === 0) {
  //     return <div><h1>Loading...</h1></div>;    // 랜더링 시 로딩을 표시
  //   };
    
  //   // category_id 별로 데이터 정리
  //   const sortedData = {};   

  //   // id와 name으로 아이템 정렬
  //   costData.forEach((item) => {
  //     const { category_id, category_name } = item;

  //     if (!sortedData[category_id]) {
  //       sortedData[category_id] = { category_name, items: [] };
  //     };

  //     sortedData[category_id].items.push(item);
  //   });
  
  //   const categoryIds = Object.keys(sortedData);
  //   const categoryRows = [];
    
  //   // category_id에 따라 홀수는 왼쪽으로, 짝수는 오른쪽으로
  //   for (let i = 0; i < categoryIds.length; i += 2) {
  //     const categoryId1 = categoryIds[i];
  //     const categoryId2 = categoryIds[i + 1];
  
  //     const categoryRow = (
  //       <div key={`${categoryId1}_${categoryId2}`} style={{ display: 'flex', marginBottom: '5%' }}>
  //         <div style={{ flex: 1, marginLeft: '-15%', marginRight: '20%' }}>
  //           {categoryId1 && (
  //             <>
  //               <h2>{sortedData[categoryId1].category_name}</h2>
  //               <Table>
  //                 <thead>
  //                   <tr>
  //                     <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;아이템 이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
  //                     <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가&nbsp;격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
  //                     <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;원&nbsp;가&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   {sortedData[categoryId1].items.map((category, idx) => (
  //                     <tr key={idx}>
  //                       <Td>{category.name}</Td>
  //                       <Td>{category.price}</Td>
  //                       <Td>
  //                         {/* 아이템의 cost 상태에 따라 버튼 또는 입력 필드 표시 */}
  //                         {editingItem === category.item_id ? (
  //                           <InputField
  //                             type="number"
  //                             defaultValue={category.cost !== null ? `${category.cost}` : ''}
  //                             onKeyDown={(e) => handlerKeyDown(e, category.item_id)}
  //                           />
  //                         ) : (
  //                           <CostButton onClick={() => handlerInputChange(category.item_id)}>
  //                             {category.cost !== null ? `${category.cost}` : '입력'}
  //                           </CostButton>
  //                         )}
  //                       </Td>
  //                     </tr>
  //                   ))}
  //                 </tbody>
  //               </Table>
  //             </>
  //           )}
  //         </div>
  //         <div style={{ flex: 1, marginLeft: '20%' }}>
  //           {categoryId2 && (
  //             <>
  //               <h2>{sortedData[categoryId2].category_name}</h2>
  //               <Table>
  //                 <thead>
  //                   <tr>
  //                     <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;아이템 이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
  //                     <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가&nbsp;격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
  //                     <Th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;원&nbsp;가&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   {sortedData[categoryId2].items.map((category, idx) => (
  //                     <tr key={idx}>
  //                       <Td>{category.name}</Td>
  //                       <Td>{category.price}</Td>
  //                       <Td>
  //                         {/* 아이템의 cost 상태에 따라 버튼 또는 입력 필드 표시 */}
  //                         {editingItem === category.item_id ? (
  //                           <InputField
  //                             type="number"
  //                             defaultValue={category.cost !== null ? `${category.cost}` : ''}
  //                             onKeyDown={(e) => handlerKeyDown(e, category.item_id)}
  //                           />
  //                         ) : (
  //                           <CostButton onClick={() => handlerInputChange(category.item_id)}>
  //                             {category.cost !== null ? `${category.cost}` : '입력'}
  //                           </CostButton>
  //                         )}
  //                       </Td>
  //                     </tr>
  //                   ))}
  //                 </tbody>
  //               </Table>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     );
  //     // 새로 추가된 카테고리(데이터상) 마다 새로운 열 추가
  //     categoryRows.push(categoryRow);
  //   };
  //   return categoryRows;
  // };

  return (
    <ComponentDiv>
      <TitleDiv>
        <h1>원가 입력</h1>
      </TitleDiv>
    <TotalDiv>
      <Item>
          {costData.map((cate)=>(
            <Menu key={cate.category_id}>
              <h2>{cate.category_name}</h2>
              <MenuDiv>
              <MenuDtDiv>
                  <MenuDtNameTitleDiv>아이템 이름</MenuDtNameTitleDiv>
                  <MenuDtPriceTitleDiv>가격</MenuDtPriceTitleDiv>
                  <MenuDtCostTitleDiv>원가</MenuDtCostTitleDiv>
              </MenuDtDiv>
              {cate.items.map((item)=>(
                <MenuDtDiv key={item.item_id}>
                  {/* <MenuDtDiv> */}
                    <MenuDtNameDiv>{item.name}</MenuDtNameDiv>
                    <MenuDtPriceDiv>{item.price}</MenuDtPriceDiv>
                    <MenuDtCostDiv>
                      <CostInput type="number" value={item.cost} onChange={(e)=>handleCostChange(cate.category_id,item.item_id,e.target.value)} placeholder="원가"/>
                    </MenuDtCostDiv>
                  {/* </MenuDtDiv> */}
                </MenuDtDiv>
              ))}
              </MenuDiv>
            </Menu>
          ))}
      </Item>
    </TotalDiv>
    <BtDiv>
        <SubmitButton type="button" onClick={handlerSubmit}>완료</SubmitButton>
    </BtDiv>
    </ComponentDiv>

    // 김상훈 코드
    // <ComponentDiv>
    //   <TitleDiv>
    //     <h1>원가 입력</h1>
    //   </TitleDiv>
    //   <CostDiv>
    //     {renderCategories()}
    //     <Link to="/home">
    //     <SubmitButton type="button" onClick={handlerSubmit}>완료</SubmitButton>
    //     </Link>
    //   </CostDiv>
      
    // </ComponentDiv>
  );
};

export default CostPage;