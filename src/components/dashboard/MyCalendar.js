import { useState } from 'react';
import styled from "styled-components";
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';
import moment from 'moment';

/* eslint-disable */

const CalendarContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  margin-top: 20%;
  width: 100%;
  height: 50%;
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 10px;
  padding: 0px 12px;
  color: var(--festie-gray-800, #3a3a3a);
  font-family: SUIT Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  text-align: start;
  appearance: none;
  background-color: white;
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  cursor: pointer;
`;

const CalendarWrapper = styled.div`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;



function MyCalendar({ date, onDateChange}) {

  // 드롭다운과 캘린더 매핑하기 위한 상태 저장
  const [value, onChange] = useState();

  // 선택한 날짜 상태 저장
  // const [startDate, setStartDate] = useState("날짜를 선택해주세요");
  // const [endDate, setEndDate] = useState();

  // 드롭다운 클릭 시 상태 저장
  const [isOpen, setIsOpen] = useState(false);

  console.log('date: ', date)

  // 드롭다운 클릭 시 캘린더 나옴
  const handlerToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  // 캘린더에서 날짜 선택 시 
  const handlerDateChange = (selectedDate) => {
    onChange(selectedDate);
    setIsOpen(false);
    // setDate(moment(selectedDate).format("YYYY-MM-DD"));  // 날짜가 선택될 때에 NowDate 값을 넣어주도록 수정

    onDateChange(selectedDate)
  };

  return (
    <CalendarContainer>
      <DropdownButton onClick={handlerToggleCalendar}>{date}</DropdownButton>
      <CalendarWrapper isOpen={isOpen}>
        <Calendar
        onChange={handlerDateChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")}>
        </Calendar>
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default MyCalendar