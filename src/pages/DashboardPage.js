import { Link } from "react-router-dom";


function DashboardPage() {
    return (
        <>
            <h1>마이페이지-대시보드페이지입니다.</h1>
            <Link to="/home">
                <button type="submit">홈으로</button>
            </Link>
        </>
    );
};

export default DashboardPage