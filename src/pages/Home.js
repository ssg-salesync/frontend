import {React ,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useRecoilState,useSetRecoilState } from 'recoil';
import { ItemsApi } from '../api/Items/ItemsApi';
import OrderPopup from "../popup/OrderPopup";
import { ItemState } from "../recoil/atoms/ItemState";

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

    const openOrderPopup = (tableId) => {
        // console.log("openOrderPopup-tableId",tableId)
        setOrderModalOn(true)
        setSelectedTableId(tableId)
        // console.log("openOrderPopup-tableId",tableId)
    }
    const closeOrderPopup = () => {
         console.log("4-closeOrderPopup답")
        setSelectedTableId(null)
        setOrderModalOn(false)
        
        // console.log("closeOrderPopup-tableId",tableId)
    }
    const [defaultItems, setDefaultItems] = useRecoilState(ItemState);

    const getData = async() =>{
        console.log("getData")
        try{
            const defaultItems = await ItemsApi();
            const dataDummy = defaultItems.categories
            const newData = dataDummy.map(cate => ({
                ...cate,
                items: cate.items.map(item => ({
                    ...item,
                    count:0, //count : 0 추가
                })),
            }));           
            setDefaultItems(newData);

        } catch(error){
            console.log("error : ", error)
        }
    }
    useEffect(() => {
        // 업데이트된 상태를 로깅
      }, [defaultItems]);

    useEffect(() => {
        getData()
    },[])

    // 테이블1 ~ 테이블8 더미데이터
    const tables = Array.from({ length: 8 }, (_, index) => index + 1);
    // const [tables,setTables] = useState([...Array(8).keys()]);

    return (
        <>
        <TableDiv>
            {tables.map((tableId) => (
                <Link to={`/order/${tableId}`} key={tableId} onClick={(e) => { e.preventDefault(); openOrderPopup(tableId); }}>
                    <TableContainer>
                        <div>
                            <span>테이블{tableId}</span>
                        </div>
                    </TableContainer>
                </Link>
            ))}
        </TableDiv>

        {orderModalOn && <OrderPopup openOrderPopup={openOrderPopup} closeOrderPopup={closeOrderPopup} tableId={selectedTableId}/>}        
        {/* {orderModalOn && <OrderPopup openOrderPopup={openOrderPopup} closeOrderPopup={closeOrderPopup}/>}         */}
        
        </>
    );
};
export default Home