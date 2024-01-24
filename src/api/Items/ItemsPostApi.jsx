import axios from 'axios';
import URL from '../BaseUrl';

/* eslint-disable */
export async function ItemsPostApi(data){
    try{
        await axios.post(`${URL}/stores`,data).then(res => {
            console.log(res);
            return res.data;
        })
    } catch(error){
        console.log(error);
    }    
}