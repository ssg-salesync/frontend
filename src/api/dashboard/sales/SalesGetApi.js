import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function SalesGetApi(date) {

  const headers = Token();

  try{
    const res = await axios.get(`${URL}/dashboard/sales`, {
      headers,
      params: {
        start: date,
        end: date
      }
    });
    console.log(res.data)
    return res.data;        
  } catch(err) {
    console.log(err);
  };
};