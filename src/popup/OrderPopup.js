import Modal from 'react-modal';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { OrderCheckState, PayCompleteState, TableState, TotalPrice } from '../recoil/atoms/ItemState';
import OrderItem from '../components/order/OrderItem';
import OrderList from '../components/order/OrderList';
import PaymentPopup from './PaymentPopup';
import { getAtom } from '../components/func/AtomData';
import { OrderGetTableApi } from '../api/Orders/OrderGetTableApi';
import { OrdersPostApi } from '../api/Orders/OrdersPostApi';

// 애니메이션 키프레임
const slideUpAnimation = `
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const modalStyle = {
  content: {
    top: '8%',
    bottom: 'auto',
    left: '9%',
    right: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', 
    height: '80%', 
    display: 'flex',
    flexDirection: 'row',
    background: 'linear-gradient(100deg, #E4F4FF 9.3%, #E0F6FF 55.65%, #D2E5FC 99.2%)',
    animation: 'slideUp 0.5s forwards', // 애니메이션 효과 적용
  },
};

// style요소에 css 애니메이션 요소를 추가
const style = document.createElement('style');
style.appendChild(document.createTextNode(slideUpAnimation));
document.head.appendChild(style);

  

  
const PayDiv = styled.div`
    width: 70%;
    height: 18%;
    position: fixed;
    bottom: 0;
    border-radius: 0.625rem;
    // background: #1C395E;
    color: #FFF;
    margin: 9%;
    display: flex;
    align-items: center;
`
const PayLDiv = styled.div`
    flex: 3;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: right;
    background: #1C395E;
    border-radius: 0.625rem;
    margin:2%;
`    
const PayRDiv = styled.div`
    flex: 2;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #1C395E;
    border-radius: 0.625rem;
    color: #FFF;
    border: none;
    margin:2%;
    &:hover {
        background-color: #e0e0e0;
    }
`
const CloseBt = styled.button`
    background: url("/img/Close.png"), #FFF 90%/ contain no-repeat;
    background-size: cover;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    border:none;
    position: fixed;
    right :3%;
`
const RightDiv = styled.div`
    flex: 1.5; 
    padding: 20px;
    background: rgba(255, 255, 255, 0.70);
    backdrop-filter: blur(25px);
`
// 모달을 위한 루트 엘리먼트 설정
Modal.setAppElement('#root');
/* eslint-disable */ 
function OrderPopup ({openOrderPopup,closeOrderPopup,tableId}) {
    // console.log("===============",tableId,"===============")
    // PaymentPopup - 결제팝업
    const [paymentPopupOn, setPaymentPopupOn] = useState(false);
    const closeAllPopup = useRecoilValue(PayCompleteState)
    const openPaymentPopup =() =>{
        setPaymentPopupOn(true)
    }

    const closePaymentPopup =() =>{       
        console.log("3-closePaymentPopup함수")
        setPaymentPopupOn(false)
        console.log("=>=>=>closePaymentPopup closeAllPopup :", closeAllPopup)
        if(closeAllPopup){
            console.log("closePaymentPopup closeAllPopup :", closeAllPopup)
            closeOrderPopup()
        }
    }
    // setItems([
    //     { name: '커피', content1: {menu:'아메리카노',price: 3000, count : 3 }, content2: {menu:'카페라떼',price: 3500, count : 0 }},
    //     { name: '디저트', content1: {menu: '초코케이크',price: 7500, count : 4 },content2:{ menu:'생크림케이크',price : 8000, count:0 }},
    //     { name: '기타', content1: {menu: '시럽',price: 500, count : 4 }}
    // ])
    // const tableName = `Table${tableId}State`
    // console.log("tableName", tableName)
    // const [menu,setMenu] = useRecoilState(`Table${tableId}State`)

    // const [menu,setMenu] = getAtom(tableId)
    
    const totalPrice = useRecoilValue(TotalPrice)
    
    const totalAmountCalculate = () =>{

        // let newTotalPrice =0 

        // menu.forEach((category) => {
        //     category.items.forEach((item) => {
        //       newTotalPrice += item.price * item.count;
        //     });
        //   });
          
        // setTotalPrice(newTotalPrice)
    };

    const closeBtClick = () =>{
        // closeOrderPopup()
    }
    useEffect(()=>{
        console.log("totalPrice 변경됨")
    },[totalPrice])
    useEffect(()=>{
        console.log("OrderPopup useEffect :",closeAllPopup)
    },[closeAllPopup])

    // const getDefaultData = async() =>{
    //     try{
    //         const defaultItems = await OrderGetTableApi();
    //         console.log("defaultItems",defaultItems)
    //     } catch(error){
    //         console.log("getDefaultData Error :", error)
    //     }
    // }
    // useEffect(()=>{
    //     getDefaultData()
    // },[])
    const menu = useRecoilValue(TableState)
    const orderCheckBt = useRecoilValue(OrderCheckState)

    // paybt click
    const postOrder = () =>{
        // const orderItems = []
        // menu.forEach(category => {
        //     category.items.forEach(item => {
        //         const {item_id, quantity} = item;
        //         // // quantity 0이 아닌 경우에만 배열에 추가
        //         if(item.quantity !== 0){
        //             orderItems.push({item_id,quantity})
        //         }                
        //     })
        // })
        // const data = {
        //     table_no : tableId,
        //     carts: orderItems
        // }
        // console.log(data)
        // const dataPost = OrdersPostApi(data);
        console.log(orderCheckBt)
        if(totalPrice === 0){
            alert( "주문 내역이 없습니다.")
        }else if(!orderCheckBt){
            alert( "주문 확인을 완료해주세요.")
        }else{
            openPaymentPopup();
        }
    }
    return(
        // {/* <input type="button" value= "orderPopup" onClick={openOrderPopup}/> */}
        <>
        <Modal isOpen={openOrderPopup} isClose={closeOrderPopup} style={modalStyle} contentLabel="orderPopup">
            {/* <ModalContent/> */}
            {/* 왼쪽 탭 화면 */}
            <div style={{ flex: 3, borderRight: '1px solid #ccc' }}>             
                {/* 왼쪽 탭 화면 컨텐츠 */}
                <OrderItem tableId={tableId}/>
            </div>

            {/* 오른쪽 컴포넌트 화면 */}
            <RightDiv>
                {/* 오른쪽 컴포넌트 화면 컨텐츠 */}
                <CloseBt type='button' onClick={closeOrderPopup}/>
                <h2>주문 목록</h2>                
                <div style={{height:'65%',overflow: 'auto'}}><OrderList/></div>
                {/* <PayButton type='button' value="Close" onClick={()=>closeOrderPopup}/> */}
                {/* <Link to={`/order/${tableId}/payment`} onClick={(e) => { e.preventDefault(); postOrder()}}> */}
                <PayDiv>
                    <PayLDiv>
                        {/* <p>총 결제금액 : {totalAmountCalculate()}원</p> */}
                        <p>총 결제금액 <br/> {totalPrice}원</p>
                    </PayLDiv>
                    {/* <Link to={`/order/${tableId}/payment`} onClick={(e) => { e.preventDefault(); postOrder()}}> */}
                    <PayRDiv onClick={(e) => { e.preventDefault(); postOrder()}}>
                        결제하기
                    </PayRDiv>
                    {/* </Link> */}
                </PayDiv>
                {/* </Link> */}
            </RightDiv>
        </Modal>
        {paymentPopupOn && <PaymentPopup openPaymentPopup={openPaymentPopup} closePaymentPopup={closePaymentPopup} closeOrderPopup={closeOrderPopup} tableId={tableId}/>}
        </>
    )
};
export default OrderPopup;