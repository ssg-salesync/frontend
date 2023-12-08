// import { useState } from 'react';
import './App.css'
// import GlobalStyle from './styles/GlobalStyle';
// import Button from 'react-bootstrap/Button';
// import { Reset } from "styled-reset"
// import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Routing from './routes/Routing';


function App() {
  return (
    <>
      {/* <GlobalStyle/>  */}
    {/* <OrderModal show={orderModalOn} onHide={()=>setOrderModalOn(false)}/> */}
    <Header/>
    <main>
      <div>
        <Routing/>
      </div>
    </main>
    <Footer/>    
{/*       
      <Reset/>
      <GlobalStyle/> */}

       


    </>
  );
};
export default App;
