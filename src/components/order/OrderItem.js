import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { ItemState } from "../../recoil/atoms/ItemState";

const TabDiv = styled.div`
    height : 90%;
    width : 90%;
    background-color : green;
    // margin-left: 1%;
`
const TabMemu = styled.ul`
    height : 5%;
    width : 100%;
    display: flex;
    flex-direction:row;
    align-items: center;
    list-style: none;
    padding: 0;

    .focused{
        //선택된 tab에 적용되는 css
        background-color : gray;
        color: blue;
    }
`
const SubMenu = styled.li`
    display: flex;
    width: 20%;
    height: 80%;
    padding:10px;
    font-size:15px;
    transition: 0.5s;
`
const Item = styled.div`
    text-align: center;
    width: 100%;
    height: 100%;
    // background-color : gray;  
    display: flex;
    flex-direction:row;
`
const Menu = styled.div`
    width: 25%;
    height:25%;
    margin : 1rem;
    background-color : gray;    
`
/* eslint-disable */
function OrderItem() {
    // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
    const [currentTab, setCurrentTab] = useState("");

    const [menu,setMenu] = useRecoilState(ItemState);

    const selectMenuHandler = (category) => {
        // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
        // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
        setCurrentTab(category);
      };

    const countMinus = (itemIdx, cateIdx)=>{
        const newData = menu.map(category => ({
            ...category,
            items: category.items.map(item => {
            
            if (item.item_id === itemIdx && category.category_id === cateIdx) {
                // 특정 category_id와 item_id에 해당하는 아이템의 count를 업데이트
                if (item.count > 0){
                    return {
                        ...item,
                        count: item.count -1, // 원하는 값으로 변경
                      };
                }                
            }
              return item;
            }),
          }));        
        setMenu(newData);
    };
    const countPlus = (itemIdx,cateIdx)=>{
        const newData = menu.map(category => ({
            ...category,
            items: category.items.map(item => {
              if (item.item_id === itemIdx && category.category_id === cateIdx) {
                // 특정 category_id와 item_id에 해당하는 아이템의 count를 업데이트
                return {
                  ...item,
                  count: item.count +1, // 원하는 값으로 변경
                };
              }
              return item;
            }),
          }));
        setMenu(newData);
    };
    // const uniqueCategories = Array.from(new Set(items.items.map(item => item.category_id)));
    useEffect(()=>{
        // 처음 화면 렌더링될때 첫번째 탭에 focus
        //console.log(menu)
        setCurrentTab(menu[0].category_id)
        
    },[])
    useEffect(()=>{
        setMenu(menu)
    },[menu])
    
    return(
        <TabDiv>
            <TabMemu>
                {/* 아래 하드코딩된 내용 대신에, map을 이용한 반복으로 코드를 수정 */}
                {/* li 엘리먼트의 class명의 경우 선택된 tab 은 'submenu focused', 나머지 2개의 tab은 'submenu'  */}
                {/* <li className="submenu">{menuArr[0].name}</li>
                    <li className="submenu">{menuArr[1].name}</li>
                    <li className="submenu">{menuArr[2].name}</li> */}
                {menu.map((cate) => (
                    // console.log("===",cate)
                    <SubMenu key={cate.category_id} className={cate.category_id === currentTab ? "tab focused" : "tab"} onClick={() => selectMenuHandler(cate.category_id)}>{cate.category_name}</SubMenu>
                ))}

                {/* {uniqueCategories.map(categoryId => (
                    <SubMenu key={categoryId} onClick={() => setActiveCategory(categoryId)}>
                        Category {categoryId}
                    </SubMenu>
                ))} */}


            </TabMemu>
            {menu.map((cate, cateIdx) => (cate.category_id === currentTab && (
                <Item key={cate.category_id}>
                    {cate.items.map((item,itemIdx) => (
                        <Menu key={item.item_id}>
                            <div>
                                <p>{item.name}</p>
                                <p>{item.price} </p>                                
                            </div>
                            <div>
                                <button type="button" onClick={() =>countMinus(item.item_id,cate.category_id)}>-</button>
                                <button type="button">{item.count}</button>  
                                <button type="button" onClick={()=>countPlus(item.item_id,cate.category_id)}>+</button> 
                            </div>
                        </Menu>
                    ))}
                </Item>
                )
            ))}
        </TabDiv>
    )
}
export default OrderItem;