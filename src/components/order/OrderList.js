import styled from "styled-components";

const ListTable = styled.table`
    width : 90%;
    height : 5%;
    display: 'flex';
    text-align: center;
`
function OrderList(){

    // 각 품목의 정보를 배열로 정의
    const items = [
    { name: '품목 1', price: 1000, count: 2 },
    { name: '품목 2', price: 2000, count: 1 },
    { name: '품목 3', price: 1500, count: 3 },
    ]

    return(
        <ListTable>
            <tbody>
            {/* 각 품목을 나열하는 매핑 작업 */}
            {items.map((item, index) => (
                <tr key={index.id} style={{background: 'gray'}}>
                    <td>{item.name}</td>
                    <td>{item.price}원</td>
                    <td>{item.count}개</td>
                </tr>
            ))}
            </tbody>
        </ListTable>
    )
}
export default OrderList;