import { Link } from "react-router-dom"


function LoginPage() {
    return (
        <>
            {/* <h1>로그인페이지입니다.</h1> */}
            <div>
                <h2>Log In</h2>
                <br/>
                아이디<input type="text"/>
                <br/>
                패스워드<input type="text"/>
                <br/>
                <Link to="/home">
                    <button type="submit">로그인</button>
                </Link>
                <Link to="/signup">
                    <button type="submit">회원가입</button>
                </Link>
            </div>
        </>
    );
};

export default LoginPage