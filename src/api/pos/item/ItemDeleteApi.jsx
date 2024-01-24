import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function ItemDeleteApi(itemId){

    const headers = Token();

    try{
        await axios.delete(`${URL}/categories/items/${itemId}`, {headers}).then(res => {
            console.log(res.data);
            return res;
        });
    } catch(err){
        console.log(err);
    };
};