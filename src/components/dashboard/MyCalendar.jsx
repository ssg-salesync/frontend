import { useState } from 'react';
import styled from "styled-components";
import Calendar from 'react-calendar';
import './MyCalendar.css';
import moment from 'moment';

/* eslint-disable */

const CalendarContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 0.5625rem;
  border:none;
  background-color: #1D56A8;
  cursor: pointer;
  white-space: nowrap;
  color: white;
  font-family: Pretendard-Regular;
  margin-top: 20%;
 
  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    font-size: 80%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 100%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 120%;
  }
`;

const CalendarWrapper = styled.div`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: -100%;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

function MyCalendar({ date, onDateChange }) {
  // 드롭다운과 캘린더 매핑하기 위한 상태 저장
  const [value, onChange] = useState();

  // 드롭다운 클릭 시 상태 저장
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 클릭 시 캘린더 나옴
  const handlerToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  // 캘린더에서 날짜 선택 시 
  const handlerDateChange = (selectedDate) => {
    onChange(selectedDate);
    setIsOpen(false);
    onDateChange(selectedDate)
  };

  return (
    <CalendarContainer>
      <DropdownButton onClick={handlerToggleCalendar}>{date}</DropdownButton>
      <CalendarWrapper isOpen={isOpen}>
        <Calendar onChange={handlerDateChange} value={value} formatDay={(locale, date) => moment(date).format("DD")}>
        </Calendar>
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default MyCalendar