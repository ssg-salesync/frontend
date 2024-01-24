import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export function CaculateGetApi(date){

    const headers = Token();

    try{
        const res = axios.get(`${URL}/dashboard/calculate`, {headers,params: {
            date: date
          }})
        console.log('cost res: ', res.data)
        return res.data;        
    } catch(err) {
        console.log(err);
    };
};