import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { getAtom } from "../func/AtomData";
import { OrderCheckState, TableState, TotalPrice} from "../../recoil/atoms/ItemState";
import { ItemsApi } from "../../api/Items/ItemsApi";
import { OrderGetTableApi } from "../../api/Orders/OrderGetTableApi";
import { OrdersPutApi } from "../../api/Orders/OrdersPutApi";
import { OrdersPostApi } from "../../api/Orders/OrdersPostApi";

const TabDiv = styled.div`
    height : 100%;
    width : 100%;
    background: linear-gradient(100deg, #E4F4FF 9.3%, #E0F6FF 55.65%, #D2E5FC 99.2%), #FFF;
    // margin-left: 1%;
`
const TabMemu = styled.ul`
    height : 10%;
    width : 100%;
    
    display: flex;
    flex-direction:row;
    align-items: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
    border-radius: 0.5rem;

    .focused{
        //선택된 tab에 적용되는 css
        background-color : #D9D9D9;
        color: black;
        border-radius: 0.5rem;
    }
`
const SubMenu = styled.li`
    display: flex;
    width: max-content;
    height: max-content;
    padding: 0.5rem;
    margin :0.5rem;
    font-size:1rem;
    transition: 0.5s;
    background-color : #FFF;
    border-radius: 0.5rem;
    justify-content: center;
`
const Item = styled.div`
    text-align: center;
    width: 100%;
    height: 80%;
    border: 0.5rem;
    // background-color : gray;  
    display: flex;
    flex-wrap: wrap;  /* 아이템들을 여러 줄로 나누기 위해 flex-wrap 추가 */
    justify-content: center;
    overflow:auto;
`
const Menu = styled.div`
    // width: 25%;
    width: calc(30% - 0.8rem);
    height:30%;
    margin : 1rem;
    background-color : #D9D9D9;
    border-radius: 0.5rem;
`
const MenuDtDiv = styled.div`
    height:60%;
    width:100%;
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
`
const MenuDtP =styled.p`
    margin:0.5rem;
`
const BtDiv = styled.div`
    height:40%;
    width:100%;
    display:flex;
    align-items:center;
    justify-content: center;
`
const QuantityBt = styled.button`
    width: 3rem;
    height: 1.5rem;
    background: #D9D9D9;
    border:none;
    font-family: 'Pretendard-Regular';
`
const MinusBt = styled.button`
    // background: url("/img/MinusBt.png") no-repeat center center;
    background: url("/img/MinusBt.png"), lightgray 50% / contain no-repeat;
    background-size: cover;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    border:none;
    padding:0;
`
const PlusBt = styled.button`
    // background: url("/img/PlusBt.png") no-repeat center center;
    background: url("/img/PlusBt.png"), lightgray 50% / contain no-repeat;
    background-size: cover;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    border:none;
    padding:0;
`
const OrderCheckBt = styled.button`
    border: none;
    border-radius: 0.5rem;
    background: #1C395E;
    color: #FFF;
    width: 4rem;
    height: 2rem;
    position: fixed;
    right :40%;
    bottom :5%;
    font-family: Pretendard-Regular;
`
/* eslint-disable */
function OrderItem({tableId}) {
    // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
    const [currentTab, setCurrentTab] = useState("");

    const [menu,setMenu] = useRecoilState(TableState)
    const [totalPrice,setTotalPrice] = useRecoilState(TotalPrice)
    //주문상태 체크(신규=true,기존=false)
    const [newOrder,setNewOrder] = useState(false)
    // 주문수정ing 상태 체크(결제x = false, 결제o = true)
    const [orderCheckBt,setOrderCheckBt] = useRecoilState(OrderCheckState)
    // 메뉴 가져오기 
    const getDefaultData = async() =>{
        console.log("getDefaultData-start")
        try{
            // const defaultItems = await ItemsApi();
            // const dataDummy = defaultItems.categories
            const dataDummy = await ItemsApi();
            const defaultData = dataDummy.map(cate => ({
                ...cate,
                items: cate.items.map(item => ({
                    ...item,
                    quantity:0, //quantity : 0 추가
                })),
            }));
            console.log("getDefaultData-complete")
            getOrderTableData(defaultData)
        } catch(error){
            console.log("getDefaultData Error :", error)
        }
    }
    // 주문내역 가져오기
    const getOrderTableData = async(defaultData) =>{
        console.log("getOrderTableData-start")
        try{
            const orderItems = await OrderGetTableApi(tableId);
            console.log("getOrderTableData-start===>",orderItems.carts.length)
            if(orderItems.carts.length === 0){
                console.log("orderItems 0")
                setNewOrder(true)
                console.log("newOrder",newOrder)
                setCurrentTab(defaultData[0].category_id)              
                setMenu(defaultData)
                console.log("getOrderTableData-complete/menu",menu)
            }else{
                // 총 결제금액 세팅
                setOrderCheckBt(true)
                setTotalPrice(orderItems.total_price)
                // 기본메뉴에 주문내역 덮어쓰기            
                const updateData = defaultData.map(cate =>{
                    const updatedMenus = cate.items.map(item =>{
                        const cartItem = orderItems.carts.find(cart => cart.item_id === item.item_id);
                        if(cartItem){
                            // 주문내역 수량 업데이트
                            return{ ...item,quantity: cartItem.quantity}
                        }
                        return item;
                    })
                    return {...cate, items:updatedMenus}
                })
                console.log("getOrderTableData-complete/updateData",updateData)
                setCurrentTab(updateData[0].category_id)
                setMenu(updateData)
                console.log("getOrderTableData-complete/menu",menu)
            }           
        } catch(error){
            console.log("getOrderTableData Error :", error)
        }
    }
    // 초기메뉴세팅 / 주문내역 추가 / 처음 화면 렌더링될때 첫번째 탭에 focus
    useEffect(()=>{
        console.log("OrderItem.js open")
        getDefaultData()
        console.log("menu first setting",menu)
    },[])
    
    // const [menu,setMenu] = getAtom(tableId)

    //console.log("menu",menu)
    // const menu = menuAll[tableId-1]
    // if(tableId === 1){
    //     const [menu,setMenu] = useRecoilState(Table1State)    
    //     // console.log("menu",menu)
    // }
    // else if(tableId === 2){
    //     const [menu,setMenu] = useRecoilState(Table2State)
    // }
    
    const selectMenuHandler = (category) => {
        // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
        // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
        setCurrentTab(category);
      };

    const quantityMinus = (itemIdx, cateIdx)=>{
        const newData = menu.map(category => ({
            ...category,
            items: category.items.map(item => {
            
            if (item.item_id === itemIdx && category.category_id === cateIdx) {
                // 특정 category_id와 item_id에 해당하는 아이템의 quantity를 업데이트
                if (item.quantity > 0){
                    setTotalPrice(prev => prev - item.price)
                    return {
                        ...item,
                        quantity: item.quantity -1, // 원하는 값으로 변경
                      };
                }                
            }
              return item;
            }),
          }));        
        setMenu(newData);
        setOrderCheckBt(false)
        console.log(orderCheckBt)
    };
    const quantityPlus = (itemIdx,cateIdx)=>{
        const newData = menu?.map(category => ({
            ...category,
            items: category.items.map(item => {
              if (item.item_id === itemIdx && category.category_id === cateIdx) {
                // 특정 category_id와 item_id에 해당하는 아이템의 quantity를 업데이트
                setTotalPrice(prev => prev + item.price)
                return {
                  ...item,
                  quantity: item.quantity +1, // 원하는 값으로 변경
                };
              }
              return item;
            }),
          }));
        setMenu(newData);
        setOrderCheckBt(false)
        console.log(orderCheckBt)
    };

    // 처음 화면 렌더링될때 첫번째 탭에 focus
    // useEffect(()=>{
    //     console.log("tableId" ,tableId)
    //     setCurrentTab(menu?.[0].category_id)
    // },[])

    useEffect(()=>{
        console.log("메뉴 변경됨")
    },[menu])

    // 주문 저장하기
//    const async orderSend=() =>{
   async function orderSend(){
        console.log("orderSend-newOrder",newOrder)
        const orderItems = []
        menu.forEach(category => {
            category.items.forEach(item => {
                const {item_id, quantity} = item;
                // // quantity 0이 아닌 경우에만 배열에 추가
                if(item.quantity !== 0){
                    orderItems.push({item_id,quantity})
                }                
            })
        })
        const data = {
            table_no : tableId,
            carts: orderItems
        }
        console.log(data)
        // 신규주문
        if(newOrder === true){
            const dataPost = await OrdersPostApi(data);
            console.log("post",dataPost)
            if(dataPost.result === "failed"){
                setNewOrder(true)
            }
            else{setNewOrder(false)}
        }
        else{ // 기존 주문 수정
            const dataPut = await OrdersPutApi(data);
            console.log("put",dataPut)
            if(dataPut.result === "cancelled"){
                setNewOrder(true)
            }
            else{setNewOrder(false)}
            // OrdersPutApi(data)
            // .then((res)=> console.log(res))
            // .catch((err)=>console.log(err))
        }
        setOrderCheckBt(true)
   }
    return(
        <TabDiv>
            <TabMemu>
                {/* 아래 하드코딩된 내용 대신에, map을 이용한 반복으로 코드를 수정 */}
                {/* li 엘리먼트의 class명의 경우 선택된 tab 은 'submenu focused', 나머지 2개의 tab은 'submenu'  */}
                {/* <li className="submenu">{menuArr[0].name}</li>
                    <li className="submenu">{menuArr[1].name}</li>
                    <li className="submenu">{menuArr[2].name}</li> */}
                <div>
                <OrderCheckBt type='button' onClick={orderSend}>확인</OrderCheckBt>
                </div>
                {menu.map((cate) => (
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
                        <MenuDtDiv>
                            <MenuDtP>{item.name}</MenuDtP>
                            <MenuDtP>{item.price}</MenuDtP>                            
                        </MenuDtDiv>
                        <BtDiv>
                            <MinusBt type="button" onClick={() =>quantityMinus(item.item_id,cate.category_id)}/>
                            <QuantityBt type="button">{item.quantity}</QuantityBt>  
                            <PlusBt type="button" onClick={()=>quantityPlus(item.item_id,cate.category_id)}/>
                        </BtDiv>
                    </Menu>
                ))}
            </Item>
                )
            ))}

        </TabDiv>
    )
}
export default OrderItem;