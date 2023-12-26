import { useRecoilState, useResetRecoilState } from "recoil"
import { TableState,Table1State,Table2State,Table3State,Table4State,Table5State,Table6State,Table7State,Table8State, TotalPrice } from "../../recoil/atoms/ItemState"

export function getAtom(tableId){

    if (tableId === 1) {
        return useRecoilState(Table1State);
      }
    if (tableId === 2) {
        return useRecoilState(Table2State);
    }
    if (tableId === 3) {
        return useRecoilState(Table3State);
    }
    if (tableId === 4) {
        return useRecoilState(Table4State);
    }
    if (tableId === 5) {
        return useRecoilState(Table5State);
    }
    if (tableId === 6) {
        return useRecoilState(Table6State);
    }
    if (tableId === 7) {
        return useRecoilState(Table7State);
    }
    if (tableId === 8) {
        return useRecoilState(Table8State);
    }
    return 0;
}

export function deleteOrderState(){
    /* eslint-disable */
    console.log("deleteOrder")
    return useResetRecoilState(TableState)
}
export function deleteTotalPriceState(){
    /* eslint-disable */
    console.log("deleteTotalPrice")
    return useResetRecoilState(TotalPrice)
}