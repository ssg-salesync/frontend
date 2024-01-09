import axios from 'axios';
import URL from '../BaseUrl';
import { Token } from '../Token';

/* eslint-disable */
export async function OrderCancelApi(tableId){
    const headers = Token()
    try{
        await axios.delete(`${URL}/orders/${tableId}`, {headers}).then(res => {
            console.log(res.data);
            return res;
        });
    } catch(err){
        console.log(err);
    };
};