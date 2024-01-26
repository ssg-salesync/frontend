import { useResetRecoilState } from "recoil"
import { TableState, TotalPrice } from "../../recoil/atoms/ItemState"

export function deleteOrderState(){
    return useResetRecoilState(TableState)
}
export function deleteTotalPriceState(){
    return useResetRecoilState(TotalPrice)
}