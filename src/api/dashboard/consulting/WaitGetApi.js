import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function WaitGetApi(reqId) {

  const headers = Token();

  try{
    const res = await axios.get(`${URL}/consulting/${reqId}`, {headers});
    console.log(res.data)
    return res.data;        
  } catch(err) {
    console.log(err);
  };
};