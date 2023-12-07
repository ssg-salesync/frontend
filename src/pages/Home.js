import { Link } from "react-router-dom"


function Home() {
    return (
        <>
            <h1>홈입니다.</h1>
            <Link to="/mypage">
                <button type="submit">마이페이지</button>
            </Link>
        </>
    );
};

export default Home