import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function PieGetApi(date) {

  const headers = Token();

  try{
    const res = await axios.get(`${URL}/bff/sales`, {
      headers,
      params: {
        start: date,
        end: date
      }
    });
    // console.log(res.data)
    return res.data;        
  } catch(err) {
    console.log(err);
  };
};