import axios from 'axios';
import URL from '../BaseUrl';
import { Token } from '../Token';

/* eslint-disable */
export async function OrdersPutApi(data){
    
    const headers = Token()

    try{
        console.log("connect:",data)
        // await axios.put(`${URL}/orders/`,data,{headers: headers}).then(res=>{
        //     console.log("OrdersPutApi",res);
        //     return res.data;
        // })
        const res = await axios.put(`${URL}/orders/`,data,{headers: headers})
        return res.data;
    } catch(error){
        console.log("error: ", error.response.data);
    }    
}