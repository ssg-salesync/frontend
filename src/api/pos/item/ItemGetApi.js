import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function ItemGetApi(){

    const headers = Token();

    try{
        const res = await axios.get(`${URL}/categories/items`, {headers})
        console.log('itemRes', res.data)
        return res.data;        
    } catch(err) {
        console.log(err);
    };
};