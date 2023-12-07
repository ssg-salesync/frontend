import { Link } from "react-router-dom"


function SignupPage() {
    return (
        <>
        <h1>회원가입페이지입니다.</h1>
            <div>
                <h2>Sign Up</h2>
                <br/>
                아이디<input type="text"/>
                <br/>
                패스워드<input type="text"/>
                <br/>
                패스워드확인<input type="text"/>
                <br/>
                이름<input type="text"/>
                <br/>
                전화번호<input type="text"/>
                <br/>
                <Link to='/signup/stores'>
                    <button type="submit">다음</button>
                </Link>
            </div>
        </>
    );
};

export default SignupPage