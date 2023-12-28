import axios from 'axios';
import URL from '../BaseUrl';
import { Token } from '../Token';

/* eslint-disable */
export async function OrdersPostApi(data){
    
    const headers = Token()

    try{
        console.log("connect:",data)
        // await axios.post(`${URL}/orders/`,data,{headers: headers}).then(res=>{
        //     console.log("OrdersPostApi",res);
        //     return res;
        // })
        const res = await axios.post(`${URL}/orders/`,data,{headers: headers});
        return res.data;
    } catch(error){
        console.log("error: ", error.response.data);
    }    
}