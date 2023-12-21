import axios from 'axios';
import URL from '../BaseUrl';

/* eslint-disable */

export async function SignupPostApi(username) {
    try {
        const res = await axios.get(`${URL}/stores/check`, {
            params: {
                username: username
            }
        });
        console.log(res);
        return res.data;
    } catch(err) {
        console.error(err);
        throw err;
    };
};