import { useRecoilValue } from "recoil";   // 읽기 전용
import styled from "styled-components";
import { TableState } from "../../recoil/atoms/ItemState";

const ListTable = styled.table`
    width : 100%;
    // height : 8%;
    text-align: center;
    border-collapse: separate;
    border-spacing: 0 10px; /* 수평 간격은 0, 수직 간격은 10px로 설정 */
`
const ListTbody = styled.tbody`

`
const ListTr = styled.tr`
    height: 2.5rem;
    &:not(:last-child) {
        margin: 1rem; /* 마지막 행을 제외한 모든 행에 간격을 주는 부분 */
        background: #E4F4FF;
    }
`
const ListTd = styled.td`
`
/* eslint-disable */
function OrderList(){
    const menu = useRecoilValue(TableState)
    console.log("OrderList-menu",menu)
    return(        
        <ListTable>
            <ListTbody>
            {/* 각 품목을 나열하는 매핑 작업 */}
            {/* {menu.map((item) => (
                <tr key={item.item_id} style={{background: 'gray'}}>
                    <td>{item.name}</td>
                    <td>{item.price}원</td>
                    <td>{item.count}개</td>
                </tr>
            ))} */}
            {menu.map((category) => (
                category.items.map((item) => (
                    item.quantity !== 0 && (
                    <ListTr key={item.item_id} style={{background: '#FFF'}}>
                        <ListTd>{category.category_name}</ListTd>
                        <ListTd>{item.name}</ListTd>
                        <ListTd>{item.price}원</ListTd>
                        <ListTd>{item.quantity}개</ListTd>
                    </ListTr>
                    )
                ))
            ))}
            </ListTbody>
        </ListTable>
    )
}
export default OrderList;