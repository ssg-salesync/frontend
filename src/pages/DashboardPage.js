import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import { SalesGetApi } from "../api/dashboard/sales/SalesGetApi";

// chart.js arc 에러 해결
import 'chart.js/auto';
import MyCalendar from "../components/dashboard/MyCalendar";

/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

// 맨 위 글자 영역
const TitleDiv = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 70%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 85%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 100%;
  }
`;

// 드롭다운 영역
const DropdownDiv = styled.div`
  width: 100%;  
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 70%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 85%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 100%;
  }
`;

// 드롭다운 컨테이너
const DropdownContainer = styled.div`
  // margin-top: 5%;
  width: 35%;
`;

// 드롭다운 스타일
const Dropdown = styled.select`
  border: none;
  border-bottom: 2px solid #1C395E;
  width: 100%;
  height: 100%;
  font-family: Pretendard-Regular;
  font-size: 85%;

  // 선택한 옵션 스타일
  option:checked {
    background-color: #00ADEF;
    color: white;
  }

  // 드롭다운 화살표 아이콘 스타일
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%231C395E" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;

  // 반응형 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 70%;
  }
`;

// 드롭다운 옵션 스타일
const DropdownOption = styled.option`
  font-family: Pretendard-Regular;
`;

// 대시보드 영역
const DashboardDiv = styled.div`
  height: 65%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 최하단 영역
const BottomDiv = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

// 완료 버튼
const SubmitButton = styled.button`
  width: 100%;
  height: 75%;
  border: none;
  border-radius: 8%;
  cursor: pointer;
  border-radius: 0.5rem;
  background: #1C395E;
  color: #FFF;

  &:hover {
    background-color: #e0e0e0;
  }

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 60%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 80%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 120%;
  }
`;

function DashboardPage() {

  const [date, setDate] = useState("날짜를 선택해주세요.");

  const handlerDateChange = (date) => {
    setDate(moment(date).format("YYYY-MM-DD"));
    // setSelectedDate(date);
  };

  const [saleData, setSaleData] = useState([]);

  const [selectedDashboardType, setSelectedDashboardType] = useState('');

  const [chartData, setChartData] = useState({});

  const dashboardType = [
    '매출',
    '순이익'
  ];

  // 드롭다운에 선택한 dashboardType과 위의 dashboardType 상태 취합
  const handlerDashboardTypeSelect = (e) => {
    const selectedType = e.target.value;
    setSelectedDashboardType(selectedType);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (selectedDashboardType === '매출') { // 추가: '매출'일 때만 데이터 가져오도록
          const data = await SalesGetApi(date);
          setSaleData(data?.items || []);
          const chartData = {
            labels: data?.items.map(item => item.name) || [],
            datasets: [
              {
                label: '판매량',
                data: data?.items.map(item => item.sales_volume) || [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
              },
            ],
          };
          setChartData(chartData);
        } 
        else if (selectedDashboardType === '순이익') { // 추가: '매출'일 때만 데이터 가져오도록
          const data = await SalesGetApi(date);
          setSaleData(data?.items || []);
          const chartData = {
            labels: data?.items.map(item => item.name) || [],
            datasets: [
              {
                label: '판매량',
                data: data?.items.map(item => item.sales_volume) || [],
                backgroundColor: ['black'],
                hoverBackgroundColor: ['white']
              },
            ],
          };
          setChartData(chartData);
        } 


      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();
  }, [date, selectedDashboardType]); // selectedDashboardType 추가
  return (
    <ComponentDiv>
      <TitleDiv>
        <h1>대시보드</h1>
      </TitleDiv>
      <DropdownDiv>
        <MyCalendar date={date} onDateChange={handlerDateChange} />
        <DropdownContainer>
          <Dropdown onChange={handlerDashboardTypeSelect}>
            <option value="" disabled selected hidden>원하는 대시보드를 선택해주세요.</option>
            {dashboardType.map((type, index) => (
              <DropdownOption key={index} value={type}>
                {type}
              </DropdownOption>
            ))}
          </Dropdown>
        </DropdownContainer>
      </DropdownDiv>
      <DashboardDiv>
        {/* 원형차트 추가 */}
        {chartData.labels && chartData.datasets && (
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        )}
      </DashboardDiv>
      <BottomDiv>
        <Link to="/home">
          <SubmitButton>홈으로</SubmitButton>
        </Link>
      </BottomDiv>
    </ComponentDiv>
  );
};

export default DashboardPage