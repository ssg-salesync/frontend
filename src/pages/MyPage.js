import { Link } from "react-router-dom"


function MyPage() {
    return (
        <>
            <h1>마이페이지입니다.</h1>
            <Link to="/mypage/myprofile">
                <button type="submit">개인 정보 수정</button>
            </Link>
            <Link to="/mypage/storeprofile">
                <button type="submit">매장 정보 수정</button>
            </Link>
            <Link to="/mypage/dashboard">
                <button type="submit">대시보드</button>
            </Link>
        </>
    );
};

export default MyPage