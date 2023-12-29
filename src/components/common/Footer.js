import { styled } from "styled-components";

const FooterDiv = styled.footer`
    height: 10vh;
    width: 100%;
    background: #1C395E;
    color: white;
    // line-height: 1%;
    // text-align: center;
    display:flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;
`

function Footer() {
    return (
        <FooterDiv>
            {/* <p>salesync</p>
            <p>salesync Intro</p> */}
            <div>&copy;Copyright 2023 salesync & Privacy</div>
        </FooterDiv>
    );
};

export default Footer