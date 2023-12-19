import axios from 'axios';
import URL from '../BaseUrl';

/* eslint-disable */
export async function ItemsApi(){
    const headers = {
        'content-type': 'application/json',
        Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eygjfdkgjfsdklgrjkdslfjgkflds',
        'X-CSRF-Token' : 'cc4cb641-57f3-4f03-9ff9-690a49227fec'
    }

    try{
        const res = await axios.get(`${URL}/orders`,{headers})
        return res.data;        
    } catch(error){
        console.log(error);
    }    
}