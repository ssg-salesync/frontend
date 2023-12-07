import { useState } from "react";
import { styled } from "styled-components";

const TabDiv = styled.div`
    margin-top : 2rem;
    margin-right : 1rem;
    height : 90%;
    widhth : 90%;
`
const TabMemu = styled.ul`
    display: flex;
    flex-direction:row;
    align-items: center;
    list-style: none;

    .submenu{
        display: flex;
        width: 25%;
        heigth: 5%;
        width:calc(100% /3);
        padding:10px;
        font-size:15px;
        transition: 0.5s;
    }
    .focused{
        //선택된 tab에 적용되는 css
        background-color : gray;
        color: blue;
    }
`
const Desc = styled.div`
  text-align: center;
`;
const Item = styled.div`
    width: 30%;
    heigth: 200px;
    background-color : gray;      
    // color: gray;
`
function OrderItem() {
    // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
    const [currentTab, clickTab] = useState(0);

    const menuArr = [
    { name: 'Tab1', content: 'Tab menu ONE' },
    { name: 'Tab2', content: 'Tab menu TWO' },
    { name: 'Tab3', content: 'Tab menu THREE' },
    ];

    const selectMenuHandler = (index) => {
        // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
        // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.

        /* eslint-disable no-console */
        console.log("selectMenuHandler",index)
        clickTab(index);
      };

    return(
        <TabDiv>
            <TabMemu>
                {/* 아래 하드코딩된 내용 대신에, map을 이용한 반복으로 코드를 수정 */}
                {/* li 엘리먼트의 class명의 경우 선택된 tab 은 'submenu focused', 나머지 2개의 tab은 'submenu'  */}
                {/* <li className="submenu">{menuArr[0].name}</li>
                    <li className="submenu">{menuArr[1].name}</li>
                    <li className="submenu">{menuArr[2].name}</li> */}
                {menuArr.map((el,index) => (
                    <li role="presentation" className={index === currentTab ? "submenu focused" : "submenu"} key={el.name} onClick={()=>{selectMenuHandler(index)}}>{el.name}</li>
                ))}
            </TabMemu>
            <Desc>                
                <Item>
                    <div>
                        <p>{menuArr[currentTab].content}</p>
                        <p>{menuArr[currentTab].content}</p>
                    </div>
                    <div>
                        <button type="button">-</button>
                        <button type="button">number</button>  
                        <button type="button">+</button> 
                    </div>
                </Item>    
            </Desc>
        </TabDiv>
    )
}
export default OrderItem;