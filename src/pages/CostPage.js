import { Link } from "react-router-dom";


function CostPage() {
    return (
        <>
            <h1>마이페이지-원가 입력 페이지입니다.</h1>
            <Link to="/home">
                <button type="submit">홈으로</button>
            </Link>
        </>
    );
};

export default CostPage