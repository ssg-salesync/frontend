import axios from 'axios';
import URL from '../../BaseUrl';

/* eslint-disable */

export async function StorePostApi(data) {
    try{
        const res = await axios.post(`${URL}/stores/`, data)
        console.log('StorePostApi', res.data)

        // 토큰 정보 추출
        const { token } = res.data;
        console.log("token",token)
        console.log("token.access_token",token.access_token)
        console.log("csrf_token",token.csrf_token)

        // 토큰 정보를 localStorage에 저장
        localStorage.setItem('access_token', token.access_token);
        localStorage.setItem('csrf_token', token.csrf_token);

        return res.data;    
    } catch(err) {
        console.log(err);
        throw err;
    };
};

// try{
//     await axios.post(`${URL}/stores/`, data).then(res => {
//         console.log('StorePostApi', res.data)
//         // 토큰 정보 추출
//         const { token } = res.data;
//         console.log("token",token)
//         console.log("token.access_token",token.access_token)
//         console.log("csrf_token",token.csrf_token)

//         // 토큰 정보를 localStorage에 저장
//         localStorage.setItem('access_token', token.access_token);
//         localStorage.setItem('csrf_token', token.csrf_token);

//         return res.data;