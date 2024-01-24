import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  background-image: url('/img/Clouds.jpg');
  background-size: cover;
  background-position: center;
  padding: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading2 = styled.h2`
  color: #333;
  font-size: 4em;
  font-family: 'Arial', sans-serif;
  margin-top: 0;
`;

const Heading1 = styled.h1`
  font-size: 8em;
  color: #2D69C4;
  font-weight: 900;
  font-family: 'Impact', sans-serif;
`;

const Paragraph = styled.p`
  color: #666;
  font-style: italic;
  font-size: 2em;
`;

function InternalErrorPage() {  
  return (
    <NotFoundContainer>
      <Heading2>Internal Server Error</Heading2>
      <Heading1>500</Heading1>
      <Paragraph>The server encountered an internal error or misconfiguration</Paragraph>
      <Paragraph>and was unable to complete your request.</Paragraph>
    </NotFoundContainer>
  );
}

export default InternalErrorPage;
