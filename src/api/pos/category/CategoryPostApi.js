import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */
export async function CategoryPostApi(newCategory){
    
    const headers = Token()

    try{
        await axios.post(`${URL}/categories/`, newCategory, {headers}).then(res => {
            console.log(res.data);
            alert('카테고리를 등록했습니다.')
            return res;
        });
    } catch(err) {
        if (err.response && err.response.status === 409) {
            alert('이미 존재하는 카테고리입니다. 다른 카테고리를 입력해주세요.');
            return Promise.reject(err);
        } else {
            console.error(err);
        };
    };
};