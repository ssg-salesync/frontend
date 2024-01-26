import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import { OrderCheckState, TableState, TotalPrice} from "../../recoil/atoms/ItemState";
import { ItemsApi } from "../../api/Items/ItemsApi";
import { OrderGetTableApi } from "../../api/orders/OrderGetTableApi";
import { OrdersPutApi } from "../../api/orders/OrdersPutApi";
import { OrdersPostApi } from "../../api/orders/OrdersPostApi";
import { OrderCancelApi } from "../../api/orders/OrderCancelApi";
import { KioskState } from "../../recoil/atoms/KioskState";

const TabDiv = styled.div`
    height : 100%;
    width : 100%;
    background: linear-gradient(100deg, #E4F4FF 9.3%, #E0F6FF 55.65%, #D2E5FC 99.2%), #FFF;
`;

const TabMemu = styled.ul`
    height : 9%;
    width : 100%;
    border-radius: 0.5rem;

    display: flex;
    flex-direction:row;
    align-items: center;
    list-style-type: none;

    padding: 0;
    margin: 0;
    overflow-x: auto;
    overflow-y: hidden;

    white-space: nowrap;

    // 선택된 tab에 적용되는 css
    .focused{
        background-color : #D9D9D9;
        color: black;
        border-radius: 0.5rem;
    }
`;

const SubMenu = styled.li`
    display: flex;
    width: 10%;
    height: max-content;
    white-space: nowrap;

    padding: 0.3rem;
    margin :0.5rem;
    font-size: 120%;
    transition: 0.5s;
    background-color : #FFF;
    border: 1px solid rgba(185, 185, 185, 1);
    border-radius: 0.5rem;
    justify-content: center;

    cursor: pointer;

    // 반응형
    @media screen and (max-width: 768px) {
      font-size: 70%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 100%;
    }
    @media screen and (min-width: 1025px) {
      font-size: 120%;
    }
`;

const Item = styled.div`
    width: 100%;
    height: 80%;
    border: 0.5rem;
    // background-color : gray;  
    display: flex;
    flex-wrap: wrap;  /* 아이템들을 여러 줄로 나누기 위해 flex-wrap 추가 */
    // justify-content: center;
    text-align: center;
    overflow:auto;
`;

const Menu = styled.div`
    // width: 25%;
    width: calc(30% - 0.7rem);
    height: 35%;
    margin : 0.7rem;
    background-color : #FFF;
    border-radius: 0.5rem;
    font-size: 120%;
    border: 1px solid rgba(185, 185, 185, 1);

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
`;

const MenuDtDiv = styled.div`
    height: 60%;
    width:100%;
    margin-top: 5%;
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
`;

const MenuDtP =styled.p`
    margin: 0.4rem;
    white-space: nowrap;
    cursor: default;
`;

const BtDiv = styled.div`
    height: 20%;
    width:100%;

    display:flex;
    align-items:center;
    justify-content: center;
`;

const QuantityBt = styled.button`
    width: 3rem;
    height: 1.5rem;

    background: #FFF;
    border:none;
    font-family: Pretendard-Regular;
    font-size: 100%;
    padding:0;
    color: #000000;

    // 반응형
    @media screen and (max-width: 768px) {
        width: 1rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 1.5rem;
    }
`;

const MinusBt = styled(FaRegMinusSquare)`
    background-size: cover;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    border:none;

    // 반응형
    @media screen and (max-width: 768px) {
        width: 1rem;
        height: 1rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 1.3rem;
        height: 1.3rem;
    }
`;

const PlusBt = styled(FaRegPlusSquare)`
    background-size: cover;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    border:none;

    // 반응형
    @media screen and (max-width: 768px) {
        width: 1rem;
        height: 1rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 1.3rem;
        height: 1.3rem;
    }
`;

const OrderBtDiv = styled.div`
    width: 97%;
    height: 10%;
    display: flex;
    justify-content: right;
    align-items: center;
`;

const OrderBt = styled.button`
    border: none;
    border-radius: 0.5rem;
    background: #1C395E;
    color: #FFF;
    // width: 15%;
    // height: 60%;
    padding: 10px 18px;
    font-family: Pretendard-Regular;
    font-size: 145%;
    margin: 1%;
    white-space: nowrap;

    cursor: pointer;

    &:hover {
        filter: drop-shadow(0px 7px 10px rgba(29, 86, 168, 0.30));
    }

    // 반응형에 맞게 폰트 크기 조정
    @media screen and (max-width: 750px) {
    font-size: 70%;
    }
    @media screen and (min-width: 750px) and (max-width: 1024px) {
    font-size: 100%;
    }
    @media screen and (min-width: 1025px) {
    font-size: 120%;
    }
`;

/* eslint-disable */
function OrderItem({tableId,closeOrderPopup}) {
    // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
    const [currentTab, setCurrentTab] = useState("");
    const navigate = useNavigate();
    const [menu,setMenu] = useRecoilState(TableState)
    const [totalPrice,setTotalPrice] = useRecoilState(TotalPrice)
    //주문상태 체크(신규=true,기존=false)
    const [newOrder,setNewOrder] = useState(false)
    // 주문수정ing 상태 체크(결제x = false, 결제o = true)
    const [orderCheckBt,setOrderCheckBt] = useRecoilState(OrderCheckState)
    const kioskState = useRecoilValue(KioskState)
    // 메뉴 가져오기 
    const getDefaultData = async() =>{
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
            getOrderTableData(defaultData)
        } catch(error){
            if (error?.response?.status >= 500 && error?.response?.status < 600) {
                // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
                navigate('/500');
              }
        }
    }
    // 주문내역 가져오기
    const getOrderTableData = async(defaultData) =>{
        try{
            const orderItems = await OrderGetTableApi(tableId);
            if(orderItems.carts.length === 0){
                setNewOrder(true)
                setCurrentTab(defaultData[0].category_id)              
                setMenu(defaultData)
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
                setCurrentTab(updateData[0].category_id)
                setMenu(updateData)
            }           
        } catch(error){
            if (error?.response?.status >= 500 && error?.response?.status < 600) {
                // 500번대 에러가 발생하면 InternalError 페이지로 리다이렉트
                navigate('/500');
              }
        }
    }
    // 초기메뉴세팅 / 주문내역 추가 / 처음 화면 렌더링될때 첫번째 탭에 focus
    useEffect(()=>{
        getDefaultData()
    },[])
    
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
    };

    useEffect(()=>{
    },[menu])

    // 주문 저장하기
   async function orderSend(){
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

        // 신규주문
        if(newOrder === true){
            const dataPost = await OrdersPostApi(data);
            if(dataPost.result === "failed"){
                setNewOrder(true)
            }
            else{setNewOrder(false)}
        }
        else{ // 기존 주문 수정
            const dataPut = await OrdersPutApi(data);
            if(dataPut.result === "cancelled"){
                setNewOrder(true)
            }
            else{setNewOrder(false)}
        }
        setOrderCheckBt(true)
        if(kioskState !== true){
            closeOrderPopup();
        }      
    }
    const orderCancel=()=>{
        const cancelOrder = OrderCancelApi(tableId);
        if(kioskState !== true){
            closeOrderPopup();
        }        
    }
    
    return(
        <TabDiv>
            <TabMemu>
                {menu.map((cate) => (
                    <SubMenu key={cate.category_id} className={cate.category_id === currentTab ? "tab focused" : "tab"} onClick={() => selectMenuHandler(cate.category_id)}>{cate.category_name}</SubMenu>
                ))}
            </TabMemu>
            {menu.map((cate) => (cate.category_id === currentTab && (
            <Item key={cate.category_id}>
                {cate.items.map((item) => (
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
            <OrderBtDiv>
                <OrderBt type='button' onClick={orderCancel}>주문 취소</OrderBt>
                <OrderBt type='button' onClick={orderSend}>주문 완료</OrderBt>
            </OrderBtDiv>
        </TabDiv>
    )
}
export default OrderItem;