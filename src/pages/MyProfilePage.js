import { Link } from "react-router-dom";


function MyProfilePage() {
    return (
        <>
            <h1>마이페이지-개인정보수정페이지입니다.</h1>
            <Link to="/home">
                <button type="submit">확인</button>
                <button type="submit">취소</button>
            </Link>
        </>
    );
};

export default MyProfilePage