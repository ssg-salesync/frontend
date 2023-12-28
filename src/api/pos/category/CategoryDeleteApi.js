import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */
export async function CategoryDeleteApi(categoryId){

    const headers = Token()

    try{
        await axios.delete(`${URL}/categories/${categoryId}`, {headers}).then(res => {
            console.log(res.data);
            return res;
        });
    } catch(err){
        console.log(err);
    };
};