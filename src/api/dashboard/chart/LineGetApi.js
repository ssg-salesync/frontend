import axios from 'axios';
import URL from '../../BaseUrl';
import { Token } from '../../Token';

/* eslint-disable */

export async function LineGetApi(date) {

  // 받아온 날짜를 오늘 날짜(날짜형식으로) 등록
  const currentDate = new Date(date);

  // 시작 날짜를 오늘날짜 -3일로 등록
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 3);

  // 끝 날짜를 오늘날짜 +3일로 등록
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 3);

  // 날짜를 API 요청에 맞게 변환
  const start = startDate.toISOString().split('T')[0];
  const end = endDate.toISOString().split('T')[0];

  const headers = Token();

  try {
    const res = await axios.get(`${URL}/dashboard/volumes`, {
      headers,
      params: {
        start: start,
        end: end,
      },
    });
    // console.log('', typeof(formattedStartDate))
    // console.log('LINE res.data: ', res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
