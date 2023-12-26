import {React ,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useRecoilState,useResetRecoilState } from 'recoil';
import { ItemsApi } from '../api/Items/ItemsApi';
import OrderPopup from "../popup/OrderPopup";
import { PayCompleteState, Table1State,Table2State,Table3State,Table4State,Table5State,Table6State,Table7State,Table8State,TableState } from "../recoil/atoms/ItemState";
import { deleteOrderState,deleteTotalPriceState } from "../components/func/AtomData";
import { UnpaidGetApi } from "../api/pay/UnpaidGetApi";

const TableDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 200px);
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: calc((100vh - 40px) / 2);
    padding: 20px 0;

    // 반응형 웹에 맞는 비율 당 보이는 테이블 갯수 설정
    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 200px);
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 200px);
    }

    @media (max-width: 600px) {
        grid-template-columns: 200px;
    }
`;
const TableContainer = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 5px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: transform 0.3s;
    cursor: pointer;

    &:hover {
        transform: scale(1.1) rotate(2deg);
    }
`;
/* eslint-disable*/
function Home() {
    const [orderModalOn, setOrderModalOn] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [closeAllPopup,setCloseAllPopup] = useRecoilState(PayCompleteState)
    
    const deleteOrder = deleteOrderState()
    const deleteTotalPrice= deleteTotalPriceState()
    
    const openOrderPopup = (tableId) => {
        setOrderModalOn(true)
        setSelectedTableId(tableId)
        document.body.style.overflow = "hidden";
    }
    const closeOrderPopup = () => {
        console.log("home.js closeAllPopup : ",closeAllPopup)
        setSelectedTableId(null)
        deleteOrder()
        deleteTotalPrice()
        setOrderModalOn(false)
        setCloseAllPopup(false)
        document.body.style.overflow = "unset"        
        // console.log("closeOrderPopup-tableId",tableId)
    }
    // const [defaultItems, setDefaultItems] = useRecoilState(TableState);
    // const [table1, setTable1] = useRecoilState(Table1State);
    // const [table2, setTable2] = useRecoilState(Table2State);
    // const [table3, setTable3] = useRecoilState(Table3State);
    // const [table4, setTable4] = useRecoilState(Table4State);
    // const [table5, setTable5] = useRecoilState(Table5State);
    // const [table6, setTable6] = useRecoilState(Table6State);
    // const [table7, setTable7] = useRecoilState(Table7State);
    // const [table8, setTable8] = useRecoilState(Table8State);

    // const getData = async() =>{
    //     console.log("getData")
    //     try{
    //         const defaultItems = await ItemsApi();
    //         console.log("defaultItems",defaultItems)
    //         const dataDummy = defaultItems.categories
    //         console.log("dataDummy",dataDummy)
    //         const newData = dataDummy.map(cate => ({
    //             ...cate,
    //             items: cate.items.map(item => ({
    //                 ...item,
    //                 quantity:0, //count : 0 추가
    //             })),
    //         }));
    //         console.log("newData",newData)
    //         if(table1 === null){setTable1(newData);console.log("table1",newData)}
    //         if(table2 === null){setTable2(newData);}
    //         if(table3 === null){setTable3(newData);}
    //         if(table4 === null){setTable4(newData);}
    //         if(table5 === null){setTable5(newData);}
    //         if(table6 === null){setTable6(newData);}
    //         if(table7 === null){setTable7(newData);}
    //         if(table8 === null){setTable8(newData);}
            
    //         // setTable1(newData);
    //         // setTable2(newData);
    //         // setTable3(newData);
    //         // setTable4(newData);
    //         // setTable5(newData);
    //         // setTable6(newData);
    //         // setTable7(newData);
    //         // setTable8(newData);

    //         return newData;

    //     } catch(error){
    //         console.log("error : ", error)
    //     }
    // }
    // useEffect(() => {
    //     // 업데이트된 상태를 로깅
    //   }, [defaultItems]);

    // useEffect(() => {
    //     getData()
    // },[])

    // useEffect(() => {
    //     console.log("table5",table5)
    // },[table5])

    // 테이블1 ~ 테이블8 더미데이터
    const [tables,setTables] = useState(Array.from({ length: 8 }, (_, index) => ({tableId : index + 1, orders : []})))
    
    //console.log("tables",tables)
    // const [tables,setTables] = useState([...Array(8).keys()]);

    const [ordersData,setOrdersData] = useState()
    const [loading,setLoading] = useState(false)
    const tableOrders=async()=>{
        try{
            const tableOrderData = await UnpaidGetApi()
            setOrdersData(tableOrderData)
            plusExistOrder()
            setLoading(true)
        }catch(error){
            console.log("tableOrders Error:",error)
            setLoading(true)
        }
    }
    const plusExistOrder = () =>{
        ordersData.forEach((order)=>{
            setTables((prev)=>
            prev.map((table)=>
            table.tableId === order.table_no
            ? {...table,orders:[...table.orders,...order.carts]}: table)
        )})
        // console.log(tables)
    }

    useEffect(()=>{
        console.log("===Home.js open===")
        tableOrders()
    },[orderModalOn])
    return (
        <>
        <TableDiv>        
        {loading && tables.map((table) => (
            <TableContainer key={table.tableId} onClick={(e) => { e.preventDefault(); openOrderPopup(table.tableId); }}>
                <div>
                    <span>테이블: {table.tableId}</span>
                    {
                        ordersData.map((order)=>
                            {
                                if(table.tableId === order.table_no){
                                    return order.carts.map((cart)=>(
                                    <div key={cart.item_id}>
                                        <p>{cart.item_name}{cart.quantity}</p>
                                    </div>)
                                    )
                                }
                            }
                        )
                    }
                    
                </div>
            </TableContainer>
        ))}
        </TableDiv>

        {orderModalOn && <OrderPopup openOrderPopup={openOrderPopup} closeOrderPopup={closeOrderPopup} tableId={selectedTableId}/>}        
        {/* {orderModalOn && <OrderPopup openOrderPopup={openOrderPopup} closeOrderPopup={closeOrderPopup}/>}         */}
        
        </>
    );
};
export default Home