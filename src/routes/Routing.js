import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import StorePage from "../pages/StorePage";
import PosPage from "../pages/PosPage";
import MyPage from "../pages/MyPage";
import InfoPage from "../pages/InfoPage";
import DashboardPage from "../pages/DashboardPage";
import OrderPopup from "../popup/OrderPopup";
import PaymentPage from "../popup/PaymentPopup";
import CardPage from "../popup/CardPopup";
import CashPage from "../popup/CashPopup";
import CostPage from "../pages/CostPage";
import InfoNpwPage from "../pages/InfoNpwPage";
import KioskPage from "../pages/KioskPage";
import SplashPage from "../pages/SplashPage";

function Routing() {
  return(
    <Routes>
      <Route path="/" element={<SplashPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/signup/stores" element={<StorePage/>}/>
      <Route path="/signup/stores/pos" element={<PosPage/>}/>
      <Route path="/mypage" element={<MyPage/>}/>
      <Route path="/mypage/info" element={<InfoPage/>}/>
      <Route path="/mypage/info/newpassword" element={<InfoNpwPage/>}/>
      <Route path="/mypage/cost" element={<CostPage/>}/>
      <Route path="/mypage/dashboard" element={<DashboardPage/>}/>
      <Route path="/order/:tableId" element={<OrderPopup/>}/>
      <Route path="/order/:tableId/payment" element={<PaymentPage/>}/>
      <Route path="/order/:tableId/payment/card" element={<CardPage/>}/>
      <Route path="/order/:tableId/payment/cash" element={<CashPage/>}/>

      <Route path="/kiosk" element={<KioskPage/>}/>
    </Routes>
  );
};

export default Routing