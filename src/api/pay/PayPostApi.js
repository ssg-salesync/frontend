import axios from 'axios';
import URL from '../BaseUrl';
import { Token } from '../Token';

/* eslint-disable */
export async function PayPostApi(data){

    const headers = Token()

    try{
        
        // await axios.post(`${URL}/orders/payment`,data,{headers: headers}).then(res=>{
        //     console.log("PayPostApi-data:",res.data)
        //     return res.data;
        // })      
        const res = await axios.post(`${URL}/sales/`,data,{headers: headers})
        return res.data;
    } catch(error){
        console.log("error: ", error.response.data);
    }    
}