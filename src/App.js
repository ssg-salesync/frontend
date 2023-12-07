// import { useState } from 'react';
import './App.css'
// import GlobalStyle from './styles/GlobalStyle';
// import Button from 'react-bootstrap/Button';
import OrderModal from './components/OrderPopup';
import { Reset } from "styled-reset"
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import OrderPage from "./popup/OrderPopup";
import DashboardPage from "./pages/DashboardPage";
import PaymentPage from "./popup/PaymentPopup";
import CardPage from "./popup/CardPopup";
import CashPage from "./popup/CashPopup";
import StorePage from "./pages/StorePage";
import PosPage from "./pages/PosPage";
import MyProfilePage from "./pages/MyProfilePage";
import StoreProfilePage from "./pages/StoreProfilePage";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

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
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/signup/stores" element={<StorePage/>}/>
          <Route path="/signup/stores/pos" element={<PosPage/>}/>
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/mypage/myprofile" element={<MyProfilePage/>}/>
          <Route path="/mypage/storeprofile" element={<StoreProfilePage/>}/>
          <Route path="/mypage/dashboard" element={<DashboardPage/>}/>
          <Route path="/order/:id" element={<OrderPage/>}/>
          <Route path="/order/:id/payment" element={<PaymentPage/>}/>
          <Route path="/order/:id/payment/card" element={<CardPage/>}/>
          <Route path="/order/:id/payment/cash" element={<CashPage/>}/>
        </Routes>
      <Footer/>

    </>
  );
};

export default App;