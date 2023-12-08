import { Link } from "react-router-dom";
import styled from "styled-components";
import PosCategory from "../components/pos/PosCategory";
import PosItem from "../components/pos/PosItem";

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VerticalLine = styled.div`
    border-left: 1px solid #ccc; /* 변경: border-left을 사용하여 선을 그림 */
    height: 100vh; /* 화면 높이의 80%로 조정 (조정 가능) */
    margin: 0 200px;
`;

function PosPage() {
    return (
        <>
            
            <FlexContainer>
                <div>
                    <PosCategory />
                </div>
                <VerticalLine />
                <div>
                    <PosItem />
                </div>
            </FlexContainer>
            <div>
                <Link to='/home'>
                    <button type="submit">완료</button>
                </Link>
            </div>
        </>
    );
};

export default PosPage;
