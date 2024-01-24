import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function InfoGetApi(){

    const headers = Token();

    try{
        const res = await axios.get(`${URL}/stores/`, {headers});
        // console.log(res)
        return res.data.store;
    } catch (err) {
        throw err;
    };
};