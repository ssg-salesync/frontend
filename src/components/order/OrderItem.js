import { useState } from "react";
import { styled } from "styled-components";

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
function OrderItem(items) {
    // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
    const [currentTab, setCurrentTab] = useState("0");
    console.log("Item:", items.items)
    const menuArr = items.items;
    // const [menuArr, setMenuArr] = useState([
    //     { name: '커피', content1: {menu:'아메리카노',price: 3000, count : 3 }, content2: {menu:'카페라떼',price: 3500, count : 0 }},
    //     { name: '디저트', content1: {menu: '초코케이크',price: 7500, count : 4 },content2:{ menu:'생크림케이크',price : 8000, count:0 }},
    //     { name: '기타', content1: {menu: '시럽',price: 500, count : 4 }}
    // ]);
    // menuArr = [
    //     { name: '커피', content1: {menu:'아메리카노',price: 3000, count : 3 }, content2: {menu:'카페라떼',price: 3500, count : 0 }},
    //     { name: '디저트', content1: {menu: '초코케이크',price: 7500, count : 4 },content2:{ menu:'생크림케이크',price : 8000, count:0 }},
    //     { name: '기타', content1: {menu: '시럽',price: 500, count : 4 }}
    // ];

    const selectMenuHandler = (name) => {
        // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
        // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
        setCurrentTab(name);
      };

    const countMinus = (key)=>{
        const updatedMenuArr = [...menuArr];            
        const menuIndex = menuArr.findIndex(item => item.name === currentTab);
        const contentIndex = key.split('content')[1];
        updatedMenuArr[menuIndex][`content${contentIndex}`].count-= 1;
        setMenuArr(updatedMenuArr);
    };
    const countPlus = (key)=>{
            const updatedMenuArr = [...menuArr];            
            const menuIndex = menuArr.findIndex(item => item.name === currentTab);
            const contentIndex = key.split('content')[1];
            updatedMenuArr[menuIndex][`content${contentIndex}`].count+= 1;
            setMenuArr(updatedMenuArr);
    };

    return(
        <TabDiv>
            <TabMemu>
                {/* 아래 하드코딩된 내용 대신에, map을 이용한 반복으로 코드를 수정 */}
                {/* li 엘리먼트의 class명의 경우 선택된 tab 은 'submenu focused', 나머지 2개의 tab은 'submenu'  */}
                {/* <li className="submenu">{menuArr[0].name}</li>
                    <li className="submenu">{menuArr[1].name}</li>
                    <li className="submenu">{menuArr[2].name}</li> */}
                {menuArr.map((el) => (
                    <SubMenu
                        key={el.name}
                        className={el.name === currentTab ? "tab focused" : "tab"}
                        onClick={() => selectMenuHandler(el.name)}>{el.name}</SubMenu>
                ))}
            </TabMemu>
            {menuArr.map((menu) => (menu.name === currentTab && (
            <Item key={menu.name}>
                {Object.keys(menu).map((key) => key.startsWith('content') ? (
                    <Menu key={key} className="menu-item">
                        <div>
                            <p>{menu[key].menu}</p>
                            <p>가격: {menu[key].price}원</p>
                        </div>
                        <div>
                            <button type="button" onClick={() =>countMinus(key)}>-</button>
                            <button type="button">{menu[key].count}</button>  
                            <button type="button" onClick={()=>countPlus(key)}>+</button> 
                        </div>
                        
                    </Menu>
                    ) : null
                )}
            </Item>
                )
                ))}
        </TabDiv>
    )
}
export default OrderItem;