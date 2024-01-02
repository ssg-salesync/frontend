import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function CategoryGetApi(){
    
    const headers = Token();

    try{
        const res = await axios.get(`${URL}/categories/`, {headers})
        console.log('categoryRes: ', res.data)
        return res.data;        
    } catch(err) {
        console.log(err);
    };
};