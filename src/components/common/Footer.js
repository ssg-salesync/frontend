import { styled } from "styled-components";

const FooterDiv = styled.footer`
    height: 10vh;
    width: 100%;
    background: grey;
`

function Footer() {
    return (
        <FooterDiv>
            <div>
                footer
            </div>
        </FooterDiv>
    );
};

export default Footer