import { atom } from "recoil";

export const ItemState = atom({
    key: "ItemState",
    default: []
});

export const TotalPrice = atom({
    key: "TotalPrice",
    default: 0
});