import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import StorePage from "../pages/StorePage";
import PosPage from "../pages/PosPage";
import MyPage from "../pages/MyPage";
import MyProfilePage from "../pages/MyProfilePage";
import StoreProfilePage from "../pages/StoreProfilePage";
import DashboardPage from "../pages/DashboardPage";
import OrderPopup from "../popup/OrderPopup";
import PaymentPage from "../popup/PaymentPopup";
import CardPage from "../popup/CardPopup";
import CashPage from "../popup/CashPopup";


function Routing() {
    return(
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
            <Route path="/order/:id" element={<OrderPopup/>}/>
            <Route path="/order/:id/payment" element={<PaymentPage/>}/>
            <Route path="/order/:id/payment/card" element={<CardPage/>}/>
            <Route path="/order/:id/payment/cash" element={<CashPage/>}/>
        </Routes>
    );
};

export default Routing