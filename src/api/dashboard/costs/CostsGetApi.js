import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function CostsGetApi(){

    const headers = Token();

    try{
        const res = await axios.get(`${URL}/dashboard/costs`, {headers})
        console.log('cost res: ', res.data)
        return res.data;        
    } catch(err) {
        console.log(err);
    };
};