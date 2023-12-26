import axios from 'axios';
import URL from '../../BaseUrl';

/* eslint-disable */

// 로컬스토리지에 있는 토큰을 가져옴
function getTokenFromLocalStorage(tokenName) {
  return localStorage.getItem(tokenName);
}

export async function CategoryGetApi(){

    const accessToken = getTokenFromLocalStorage('access_token');
    const csrfToken = getTokenFromLocalStorage('csrf_token');

    const headers = {
        'content-type': 'application/json',
        Authorization : `Bearer ${accessToken}`,
        'X-CSRF-Token' : csrfToken
    };

    try{
        const res = await axios.get(`${URL}/categories/`,{headers})
        console.log('categoryRes: ', res.data)
        return res.data;        
    } catch(err) {
        console.log(err);
    };
};