import axios from 'axios';
import URL from './BaseUrl';

// get 요청일 경우
// - api 파일
/* eslint-disable */
export async function ItemsApi(){
    try{
        await axios.get(`${URL}/stores`).then(res => {
            console.log(res);
            return res.data;
        })
    } catch(error){
        console.log(error);
    }    
}
// - ui 파일
const dataGet = ItemsApi();

// post 요청일 경우
// - api 파일
/* eslint-disable */
export async function ItemsPostApi(data){
    try{
        await axios.post(`${URL}/stores`,data).then(res => {
            console.log(res);
            return res.data;
        })
    } catch(error){
        console.log(error);
    }    
}
// - ui 파일
const data = {
    userId:sessionStorage.getItem('userId'),
    boardId:'변수',
    content:'변수'            
}
const dataPost = ItemsPostApi(data);