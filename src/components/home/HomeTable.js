import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const TableDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 200px);
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: calc((100vh - 40px) / 2);
    padding: 20px 0;

    // 반응형 웹에 맞는 비율 당 보이는 테이블 갯수 설정
    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 200px);
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 200px);
    }

    @media (max-width: 600px) {
        grid-template-columns: 200px;
    }
`;

const TableContainer = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 5px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: transform 0.3s;
    cursor: pointer;

    &:hover {
        transform: scale(1.1) rotate(2deg);
    }
`;

function HomeTable() {

    // 테이블1 ~ 테이블8 더미데이터
    const tables = Array.from({ length: 8 }, (_, index) => index + 1);

    return (
        <TableDiv>
            {tables.map((id) => (
                <Link to={`/order/${id}`} key={id}>
                    <TableContainer>
                        <div>
                            <span>테이블 {id}</span>
                        </div>
                    </TableContainer>
                </Link>
            ))}
        </TableDiv>
    );
}

export default HomeTable;