import axios from 'axios';
import URL from '../../BaseUrl';

/* eslint-disable */

export async function StorePostApi(data) {
    try{
        await axios.post(`${URL}/stores/`, data).then(res => {
            console.log('StorePostApi', res.data)
            return res.data;
        })
    } catch(err) {
        console.log(err);
        throw err;
    };
};