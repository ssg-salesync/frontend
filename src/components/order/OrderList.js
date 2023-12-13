import styled from "styled-components";

const ListTable = styled.table`
    width : 90%;
    height : 5%;
    display: 'flex';
    text-align: center;
`
/* eslint-disable */
function OrderList(items){
    console.log(items)
    return(
        <ListTable>
            <tbody>
            {/* 각 품목을 나열하는 매핑 작업 */}
            {items.items.map((item, index) => (
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