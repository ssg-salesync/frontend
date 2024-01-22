import axios from 'axios';
import URL from '../../BaseUrl';

/* eslint-disable */

export async function LoginPostApi(data) {
    try {
        const res = await axios.post(`${URL}/stores/login`, data);
        
        // 토큰 정보 추출
        const { access_token, csrf_token } = res.data;

        // 토큰 정보를 localStorage에 저장
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('csrf_token', csrf_token);

        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    };
};

// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import URL from '../../BaseUrl';

// /* eslint-disable */

// export async function LoginPostApi(data) {
//     const navigate = useNavigate();
//     try {
//         const res = await axios.post(`${URL}/stores/login`, data);
        
//         // 토큰 정보 추출
//         const { access_token, csrf_token } = res.data;

//         // 토큰 정보를 localStorage에 저장
//         localStorage.setItem('access_token', access_token);
//         localStorage.setItem('csrf_token', csrf_token);

//         return res.data;
//     } catch (err) {
//         if (err.response && err.response.status >= 500 && err.response.status < 600) {
//             // 500번대 에러가 발생하면 internalerror 페이지로 리다이렉트
//             navigate('/500');
//           }
//         console.log(err);
//         throw err;
//     };
// };