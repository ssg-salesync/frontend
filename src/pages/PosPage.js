import { Link } from "react-router-dom";
import PosCategory from "../components/pos/PosCategory";
import PosItem from "../components/pos/PosItem";


function PosPage() {
    return (
        <>
            <h1>회원가입-매장등록-POS추가페이지입니다.</h1>
                <div>
                    <PosCategory/>
                </div>
                <div>
                    <PosItem/>
                </div>
                <div>
                <Link to='/home'>
                    <button type="submit">완료</button>
                </Link>
                </div>
        </>
    );
};

export default PosPage