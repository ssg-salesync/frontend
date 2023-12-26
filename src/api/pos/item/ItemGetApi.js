import axios from 'axios';
import URL from '../../BaseUrl';

/* eslint-disable */

// 로컬스토리지에 있는 토큰을 가져옴
function getTokenFromLocalStorage(tokenName) {
  return localStorage.getItem(tokenName);
}

export async function ItemGetApi(){

    const authToken = getTokenFromLocalStorage('access_token');
    const csrfToken = getTokenFromLocalStorage('csrf_token');

    const headers = {
        'content-type': 'application/json',
        Authorization : `Bearer ${authToken}`,
        'X-CSRF-Token' : csrfToken
    };

    try{
        const res = await axios.get(`${URL}/categories/items`, {headers})
        console.log('itemRes', res.data)
        return res.data;        
    } catch(err) {
        console.log(err);
    };
};