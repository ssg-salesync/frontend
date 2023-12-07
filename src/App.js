// import { useState } from 'react';
import './App.css'
// import GlobalStyle from './styles/GlobalStyle';
// import Button from 'react-bootstrap/Button';
import OrderModal from './components/OrderPopup';


function App () {
   
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
    </>
  )
};
export default App;