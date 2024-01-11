import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function CostsPostApi(items){

    const headers = Token();

    try{
        await axios.post(`${URL}/dashboard/costs`, items, {headers}).then(res => {
            console.log(res.data);
            alert('원가를 등록했습니다.')
            return res;
        });
    } catch (err) {
        throw err;
    };
};