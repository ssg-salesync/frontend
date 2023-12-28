import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */
export async function ItemPostApi(selectedCategoryId, newItem){

    const headers = Token()

    try{
        await axios.post(`${URL}/categories/${selectedCategoryId}/items`, newItem, {headers}).then(res => {
            console.log(res.data);
            alert('아이템을 등록했습니다.')
            return res;
        });
    } catch(err){
        if (err.response && err.response.status === 409) {
            alert('이미 존재하는 아이템입니다. 다른 아이템을 입력해주세요.');
            return Promise.reject(err);
        } else {
            console.error(err);
        };
    };
};