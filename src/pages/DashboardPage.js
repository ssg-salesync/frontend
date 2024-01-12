import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import { SalesGetApi } from "../api/dashboard/sales/SalesGetApi";
import MyCalendar from "../components/dashboard/MyCalendar";

// chart.js arc 에러 해결
import 'chart.js/auto';

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
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 480px) {
    font-size: 80%;
  }

  @media screen and (min-width: 481px) and (max-width: 1024px) {
    font-size: 100%;
  }

  @media screen and (min-width: 1025px) {
    font-size: 120%;
  }
`;

// 드롭다운 영역
const DropdownDiv = styled.div`
  width: 100%;  
  height: 5%;
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
  margin-top: 2%;
  width: 35%;
`;

// 드롭다운 스타일
const Dropdown = styled.select`
  border: none;
  border-bottom: 2px solid #1C395E;
  width: 100%;
  height: 50%;
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
  height: 75%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

// 도넛, 텍스트 전체 영역
const DoughnutDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 5%;
`;

// 도넛 영역
const DoughnutContainer = styled.div`
  height: 80%;
  width: 40%;
  display: flex;
  align-items: center;
  // background-color: white;
  justify-content: center;
  border-radius: 0.5625rem;
`;

// 도넛 텍스트 영역
const DoughnutTextContainer = styled.div`
  height: 80%;
  width: 40%;
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: center;
  border-radius: 0.5625rem;
`;

// 그래프, 텍스트 전체 영역
const GraphDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

// 그래프 영역
const GraphContainer = styled.div`
  height: 80%;
  width: 40%;
  display: flex;
  align-items: center;
  // background-color: white;
  justify-content: center;
  border-radius: 0.5625rem;
`;

// 그래프 텍스트 영역
const GraphTextContainer = styled.div`
  height: 80%;
  width: 40%;
  display: flex;
  align-items: center;
  // background-color: white;
  justify-content: center;
  border-radius: 0.5625rem;
`;

// 버튼 영역
const BottonDiv = styled.div`
  height: 5%;
  width: 100%;
  display: flex;
  align-items: center;
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

  // default 오늘 날짜
  const today = moment().format("YYYY-MM-DD");

  // calendar용 날짜 상태 저장
  const [date, setDate] = useState(today);

  // 변경된 날짜 이벤트 핸들러
  const handlerDateChange = (date) => {
    setDate(moment(date).format("YYYY-MM-DD"));
  };

  // 판매 데이터 상태 저장
  const [saleData, setSaleData] = useState([]);
  
  // 대시보드 타입 상태 저장
  const [selectedDashboardType, setSelectedDashboardType] = useState('매출');

  // 차트 데이터 상태 저장
  const [chartData, setChartData] = useState({});

  // 드롭다운 대시보드 타입 목록
  const dashboardType = [
    '매출',
    '순이익'
  ];

  // 드롭다운에 선택한 dashboardType과 위의 dashboardType 상태 취합
  const handlerDashboardTypeSelect = (e) => {
    const selectedType = e.target.value;
    setSelectedDashboardType(selectedType);
  };

  // Chart.js에 GET으로 가져온 데이터 보여주기
  useEffect(() => {
    async function fetchData() {
      try {
        if (selectedDashboardType === '매출') {
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
        else if (selectedDashboardType === '순이익') {
          const data = await SalesGetApi(date);
          setSaleData(data?.items || []);
          const chartData = {
            labels: data?.items.map(item => item.name) || [],
            datasets: [
              {
                label: '판매량',
                data: data?.items.map(item => item.profit) || [],
                backgroundColor: ['black'],
                hoverBackgroundColor: ['white']
              },
            ],
          };
          setChartData(chartData);
        };
      } catch (error) {
        console.log(error);
      };
    };
    fetchData();
  }, [date, selectedDashboardType]);

  return (
    <ComponentDiv>
      <TitleDiv>
        <h1>대시보드</h1>
      </TitleDiv>
      <DropdownDiv>
        <MyCalendar date={date} onDateChange={handlerDateChange} />
        <DropdownContainer>
          <Dropdown onChange={handlerDashboardTypeSelect} value={selectedDashboardType}>
            {dashboardType.map((type, idx) => (
              <DropdownOption key={idx} value={type}>
                {type}
              </DropdownOption>
            ))}
          </Dropdown>
        </DropdownContainer>
      </DropdownDiv>
      <DashboardDiv>
        <DoughnutDiv>
          <DoughnutContainer>
            {chartData.labels && chartData.datasets && (
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            )}
          </DoughnutContainer>
          <DoughnutTextContainer>
            <h1>
              여기는 도넛 텍스트
            </h1>
          </DoughnutTextContainer>
        </DoughnutDiv>
        <GraphDiv>
          <GraphContainer>
            <h1>
              여기는 꺾은선 그래프
            </h1>
          </GraphContainer>
          <GraphTextContainer>
            <h1>
              여기는 꺾은선 텍스트
            </h1>
          </GraphTextContainer>
        </GraphDiv>
      </DashboardDiv>
      <BottonDiv>
        <Link to="/home">
          <SubmitButton>홈으로</SubmitButton>
        </Link>
      </BottonDiv>
    </ComponentDiv>
  );
};

export default DashboardPage;