// import { useState } from 'react';
import './App.css'
// import GlobalStyle from './styles/GlobalStyle';
// import Button from 'react-bootstrap/Button';
import { Reset } from "styled-reset"
import OrderModal from './components/OrderPopup';
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Routing from './routes/Routing';


function App() {
  return (
    <>
      {/* <GlobalStyle/>  */}
    {/* <OrderModal show={orderModalOn} onHide={()=>setOrderModalOn(false)}/> */}
    <header>
      <div>
        header
      </div>
      <OrderModal/>
    </header>
    <main>
      <div>
        main
      </div>
      </main>
    <footer>
      <div>
       footer
      </div>
    </footer>
    
    
      <Header/>
      <Reset/>
      <GlobalStyle/>
      <Routing/>
       
      <Footer/>

    </>
  );
};
export default App;
