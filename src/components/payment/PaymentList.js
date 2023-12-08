import styled from "styled-components";

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
    // 각 품목의 정보를 배열로 정의
    const items = [
        { name: '품목 1', price: 1000, count: 2 },
        { name: '품목 2', price: 2000, count: 1 },
        { name: '품목 3', price: 1500, count: 3 },
        { name: '품목 4', price: 1500, count: 4 },
    ]

    return (
        <>
        <div style={{height:'60%','justify-content': 'center', display: 'flex', marginTop: '10%'}}>
            <ListTable>
                <tbody>
                {/* 각 품목을 나열하는 매핑 작업 */}
                {items.map((item, index) => (
                    <ListTableTr key={index.id}>
                        <ListTableTd>{item.name}</ListTableTd>
                        <ListTableTd>{item.price}원</ListTableTd>
                        <ListTableTd>{item.count}개</ListTableTd>
                    </ListTableTr>
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
                    <div>0000원</div>
            </PayDiv>
        </div>
        </>
    );
};
export default PaymentList