import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function InfoPostApi(password){

    const headers = Token();

    try{
        const res = await axios.post(`${URL}/stores/pwcheck`, password, {headers});
        console.log(res)
        return res;
    } catch (err) {
        throw err;
    };
};