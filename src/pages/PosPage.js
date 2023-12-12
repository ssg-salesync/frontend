import { Link } from "react-router-dom";
import styled from "styled-components";
import PosCategory from "../components/pos/PosCategory";
import PosItem from "../components/pos/PosItem";

const FlexContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 150px;
    transition: padding-left 0.3s;
    
    @media (max-width: 768px) {
        padding-left: 0px;
    }
`;

const VerticalLine = styled.div`
    border-left: 1px solid #ccc;
    height: 100vh;
    display: block;
    margin-left: 150px;
    transition: margin-left 0.3s;
    margin-right: 150px;
    transition: margin-right 0.3s;

    @media (max-width: 768px) {
        margin-left: 0;
    }
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
                    <Link to='/home'>
                        <button type="submit">완료</button>
                    </Link>
                </div>
            </FlexContainer>
            <div />
        </>
    );
};

export default PosPage;
