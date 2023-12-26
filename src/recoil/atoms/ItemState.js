import { atom } from "recoil";

export const TableState = atom({
    key: "TableState",
    // default: {table1:[],table2:[],table3:[],table4:[],table5:[],table6:[],table7:[],table8:[]}
    default: []
});
export const TotalPrice = atom({
    key: "TotalPrice",
    default: 0
});
export const OrderCheckState = atom({
    key: "OrderCheckState",
    default: false
});
// 결제 후 팝업 모두 닫기(true)
export const PayCompleteState = atom({
    key: "PayCompleteState",
    default: false
});

export const Table1State = atom({
    key: "Table1State",
    default: []
});
export const Table2State = atom({
    key: "Table2State",
    default: []
});
export const Table3State = atom({
    key: "Table3State",
    default: []
});
export const Table4State = atom({
    key: "Table4State",
    default: []
});
export const Table5State = atom({
    key: "Table5State",
    default: []
});
export const Table6State = atom({
    key: "Table6State",
    default: []
});
export const Table7State = atom({
    key: "Table7State",
    default: []
});
export const Table8State = atom({
    key: "Table8State",
    default: []
});