import axios from 'axios';
import URL from '../BaseUrl';

/* eslint-disable */
export async function PayPutApi(data){
    const headers = {
        'content-type': 'application/json',
        Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMjUyMDM1NCwianRpIjoiY2M4ZDI5ODMtYTZkYS00NTMyLTlkYTQtYzZlMGM2YTQ3ZmE3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzAyNTIwMzU0LCJleHAiOjE3MDUxMTIzNTR9.g4fz5XJyyXMzbFYApNZS1hSMhZuWE3upSagu2CKJVII',
        'X-CSRF-Token' : 'ImE0NWZkNWI4ZDQ3ZGVkN2VkNzQ2MTUwYmEzM2FmNDA1ZGEyZTE4Yzci.ZXpmIg.PjAV8rh96_mPNuQ3EDE-ZUItAsw'
    }

    try{
        
        // await axios.put(`${URL}/orders/payment`,data,{headers: headers}).then(res=>{
        //     console.log("PayPutApi-data:",res.data)
        //     return res.data;
        // })      
        const res = await axios.put(`${URL}/orders/payment`,data,{headers: headers})
        return res.data;
    } catch(error){
        console.log("error: ", error.response.data);
    }    
}