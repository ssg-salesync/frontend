import axios from 'axios';
import URL from '../../BaseUrl';

/* eslint-disable */

// 로컬스토리지에 있는 토큰을 가져옴
function getTokenFromLocalStorage(tokenName) {
    return localStorage.getItem(tokenName);
};

export async function CategoryPostApi(newCategory){

    const accessToken = getTokenFromLocalStorage('access_token');
    const csrfToken = getTokenFromLocalStorage('csrf_token');

    const headers = {
        'content-type': 'application/json',
        Authorization : `Bearer ${accessToken}`,
        'X-CSRF-Token' : csrfToken
    };

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