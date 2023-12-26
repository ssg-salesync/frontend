import { useRecoilValue } from "recoil";   // 읽기 전용
import styled from "styled-components";
import { TableState } from "../../recoil/atoms/ItemState";

const ListTable = styled.table`
    width : 90%;
    height : 5%;
    display: 'flex';
    text-align: center;
`
/* eslint-disable */
function OrderList(){
    const menu = useRecoilValue(TableState)
    console.log("OrderList-menu",menu)
    return(        
        <ListTable>
            <tbody>
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
                    <tr key={item.item_id}>
                        <td>{category.category_name}</td>
                        <td>{item.name}</td>
                        <td>{item.price}원</td>
                        <td>{item.quantity}개</td>
                    </tr>
                    )
                ))
            ))}
            </tbody>
        </ListTable>
    )
}
export default OrderList;