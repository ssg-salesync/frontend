import axios from 'axios';
import URL from '../../../BaseUrl';
import { Token } from '../../../Token';

/* eslint-disable */

export async function ConsultingTestGetApi(reqId) {



  const headers = Token();

  try{
    const res = await axios.get(`${URL}/dashboard/consulting/test/${reqId}`, {headers});
    console.log(res.data)
    return res.data;        
  } catch(err) {
    console.log(err);
  };
};