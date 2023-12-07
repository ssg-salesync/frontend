import { Link } from "react-router-dom"


function StorePage() {
    return (
        <>
            <h1>회원가입-매장등록페이지입니다.</h1>
            <div>
                <h2>매장등록</h2>
                <br/>
                매장명<input type="text"/>
                <br/>
                주소<input type="text"/>
                <br/>
                업종<input type="text"/>
                <br/>
                <Link to='/signup/stores/pos'>
                    <button type="submit">다음</button>
                </Link>
            </div>
        </>
       
    );
};

export default StorePage