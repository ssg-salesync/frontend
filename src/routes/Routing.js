import { Navigate, Route, Router, Routes} from "react-router-dom";
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
import NotFoundPage from "../pages/NotFoundPage";
import WelcomePage from "../pages/WelcomePage";
import Layout from "../components/common/Layout";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import InternalErrorPage from "../pages/InternalErrorPage";

/* eslint-disable*/
function Routing() {

  return(
    <Routes>
    <Route element={<Layout />}>      
      <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
      <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/signup/stores" element={<PrivateRoute element={<StorePage />} />} />
      <Route path="/signup/stores/pos" element={<PrivateRoute element={<PosPage />} />} />
      <Route path="/mypage" element={<PrivateRoute element={<MyPage />} />} />
      <Route path="/mypage/info" element={<PrivateRoute element={<InfoPage />} />} />
      <Route path="/mypage/info/newpassword" element={<PrivateRoute element={<InfoNpwPage />} />} />
      <Route path="/mypage/cost" element={<PrivateRoute element={<CostPage />} />} />
      <Route path="/mypage/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
      <Route path="/order/:tableId" element={<PrivateRoute element={<OrderPopup />} />} />
      <Route path="/order/:tableId/payment" element={<PrivateRoute element={<PaymentPage />} />} />
      <Route path="/order/:tableId/payment/card" element={<PrivateRoute element={<CardPage />} />} />
      <Route path="/order/:tableId/payment/cash" element={<PrivateRoute element={<CashPage />} />} />
      <Route path="/kiosk" element={<PrivateRoute element={<KioskPage />} />} />
    </Route>
    <Route path="/" element={<WelcomePage/>} />
    <Route path="/internalerror" element={<InternalErrorPage />} />
    {/* NotFound 페이지를 가장 맨 아래에 위치 */}
    <Route path="/*" element={<NotFoundPage />} />
  </Routes>
  );
};

export default Routing