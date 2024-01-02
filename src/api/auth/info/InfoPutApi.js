import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function InfoPutApi(storeId, newPassword) {

    const headers = Token();

    try {
        await axios.put(`${URL}/stores/${storeId}`, newPassword, {headers}).then(res => {
            console.log(res.data);
            alert('비밀번호를 수정했습니다.')
            return res;
        });
    } catch(err) {
        console.error(err);
        throw err;
    };
};