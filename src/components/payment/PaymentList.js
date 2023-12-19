import styled from "styled-components";
import { useRecoilValue } from "recoil";   // 읽기 전용
import { ItemState, TotalPrice } from "../../recoil/atoms/ItemState";

const ListTable = styled.table`
    width : 80%;
    height : 5%;
    display: 'flex';
    text-align: center;
    margin-top: 10%;
    border-collapse: collapse;
`
const ListTableTr = styled.tr`
    background: gray;
    border-radius:'10px';
`
const ListTableTd = styled.td`
    line-height: 100%;
    padding: 1rem;
`
const PayDiv = styled.div`
    width: 60%;
    height: 90%;
    background-color: gray;

    display: flex;
    align-items : center;
    justify-content: center;
    text-align: center;
    flex-direction: column;

`
function PaymentList() {
    const menu = useRecoilValue(ItemState)
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
        <div style={{height:'60%','justify-content': 'center', display: 'flex', marginTop: '10%'}}>
            <ListTable>
                <tbody>
                {/* 각 품목을 나열하는 매핑 작업 */}
                {menu.map((category) => (category.items.map((item) => (
                    item.count !== 0 && (<ListTableTr key={item.item_id}>
                            <ListTableTd>{category.category_name}</ListTableTd>
                            <ListTableTd>{item.name}</ListTableTd>
                            <ListTableTd>{item.price}원</ListTableTd>
                            <ListTableTd>{item.count}개</ListTableTd>
                        </ListTableTr>)
                    ))
                ))}
                </tbody>
            </ListTable>
        </div>
        <div style={{height:'25%', 'justify-content': 'center', display: 'flex','align-items' : 'center'}}>
            <PayDiv>
                {/* <div style={{ flex: 3, borderRight: '1px solid #ccc'}}>
                    총 결제금액
                </div>
                <div style={{ flex: 1.5}}>
                    결제하기
                </div> */}
                    <div>총 결제금액</div>
                    <div>{totalPrice}원</div>
            </PayDiv>
        </div>
        </>
    );
};
export default PaymentList