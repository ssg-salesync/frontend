import styled from "styled-components";
import { useRecoilValue } from "recoil";   // 읽기 전용
import { TableState, TotalPrice } from "../../recoil/atoms/ItemState";

const ListTableDiv = styled.div`
    height: 60%;
    justify-content: center;
    display: flex; 
    margin-top: 10%;
    overflow: hidden;
`
const ListTable = styled.table`
    width : 80%;
    height : 5%;
    border-collapse: separate;
    border-spacing: 0 10px;
    font-size: 1.2rem;
`
const ListTableTr = styled.tr`
    background: #FFF;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
`
const ListTableTd = styled.td`
    line-height: 100%;
    padding: 0.8rem;
    white-space: nowrap;
    // border-radius: 0.5rem;

    // 반응형에 맞게 폰트 크기 조정
    @media screen and (max-width: 768px) {
      font-size: 70%;
      padding: 0.4rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 100%;
      padding: 0.6rem;
    }
    @media screen and (min-width: 1025px) {
      font-size: 120%;
    }
`
const PayDiv = styled.div`
    height: 25%;
    justify-content: center;
    display: flex;
    align-items : center;
`
const PayContentDiv = styled.div`
    width: 55%;
    height: 70%;
    border-radius: 0.6rem;
    background: #1C395E;
    color: #FFF;

    display: flex;
    align-items : center;
    justify-content: center;
    text-align: right;
    flex-direction: column;

    font-size: 150%;
    white-space: nowrap;

    // 반응형에 맞게 폰트 크기 조정
    @media screen and (max-width: 768px) {
      font-size: 95%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 120%;
    }
    @media screen and (min-width: 1025px) {
      font-size: 150%;
    }
`
function PaymentList() {
    const menu = useRecoilValue(TableState)
    // const [menu,setMenu] = getAtom(tableId)
    const totalPrice = useRecoilValue(TotalPrice)
    // const totalAmountCalculate = () =>{
    //     let totalPrice = 0;

    //     menu.forEach((category) => {
    //         category.items.forEach((item) => {
    //           totalPrice += item.price * item.count;
    //         });
    //       });
      
    //       return totalPrice;
    // };
    return (
        <>
        <ListTableDiv>
            <ListTable>
                <tbody>
                {/* 각 품목을 나열하는 매핑 작업 */}
                {menu.map((category) => (category.items.map((item) => (
                    item.quantity !== 0 && (<ListTableTr key={item.item_id}>
                            <ListTableTd>{category.category_name}</ListTableTd>
                            <ListTableTd>{item.name}</ListTableTd>
                            <ListTableTd>{item.price}원</ListTableTd>
                            <ListTableTd>{item.quantity}개</ListTableTd>
                        </ListTableTr>)
                    ))
                ))}
                </tbody>
            </ListTable>
        </ListTableDiv>
        <PayDiv>
            <PayContentDiv>
                {/* <div style={{ flex: 3, borderRight: '1px solid #ccc'}}>
                    총 결제금액
                </div>
                <div style={{ flex: 1.5}}>
                    결제하기
                </div> */}
                {/* <div>총 결제금액</div>
                <div>{totalPrice}원</div> */}
                {/* <div>총 결제금액 : {totalPrice}원</div> */}
                총 결제금액 : {totalPrice}원
            </PayContentDiv>
        </PayDiv>
        </>
    );
};
export default PaymentList