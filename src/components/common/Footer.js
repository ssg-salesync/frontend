import { styled } from "styled-components";

const FooterDiv = styled.footer`
    height: 10vh;
    width: 100%;
    text-align: center;
    background: gray;
    color: white;
    line-height: 1%;
`

function Footer() {
    return (
        <FooterDiv>
            <p>salesync</p>
            <p>salesync Intro</p>
            <div>@Copyright 2023 salesync & Privacy</div>
        </FooterDiv>
    );
};

export default Footer